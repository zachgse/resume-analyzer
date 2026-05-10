"use client"

import React, { useTransition } from "react";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { initialFrontend } from "@/app/utils/schema";
import { File } from "lucide-react";
import { Conversation, InitialMessage } from "@/app/utils/types";
import { formatInitialMessage, formatNewMessage } from "@/app/utils/helper";
import Error from "../Error";
import Loading from "../Loading";

type InitialFormProps = {
    setFile: React.Dispatch<React.SetStateAction<string|undefined>>
    setConversation: React.Dispatch<React.SetStateAction<Conversation[]>>
    isError: boolean
    setIsError: React.Dispatch<React.SetStateAction<boolean>>
}

const InitialForm = ({
    setFile,
    setConversation,
    isError,
    setIsError
}:InitialFormProps) => {
    const { 
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(initialFrontend)
    })
    const [isPending,startTransition] = useTransition();
    const [dragging,setDragging] = React.useState<boolean>(false);
    const [fileName,setFileName] = React.useState<string|null>("");

    const handleDrop = (e:React.DragEvent) => {
        e.preventDefault();
        setDragging(false);

        const file = e.dataTransfer.files[0];
        if (file) {
            setValue("resume", file, {
                shouldValidate: true,
                shouldDirty: true
            });
        }
    }

    const submitHandler = (data:InitialMessage) => {
        startTransition(async() => {
            try {
                const initialMessage = formatInitialMessage({  // for backend to be sent to gemini
                title:data.title,
                jobDescription:data.jobDescription});
                const userMessage = formatNewMessage({ role:"user",text:initialMessage }) // for ui display 
                setConversation(prev => [...prev,userMessage]); // updating local state
                const formData = new FormData();
                formData.append("message",initialMessage);
                formData.append("resume",data.resume);
                const response = await fetch("/api/analyze/initial", {
                    method:"POST",
                    body: formData,
                });
                if (!response.ok) {
                    setIsError(true);
                }
                const result = await response.json();
                const modelMessage = formatNewMessage({role:"model",text:result.message})
                const resumeContents = result.resume_contents;
                const pdfResponse = await fetch("/api/generate",{
                    method:"POST",
                    body: JSON.stringify(resumeContents)
                });
                if (!pdfResponse.ok) {
                    setIsError(true);
                }
                const blob = await pdfResponse.blob();
                const url = window.URL.createObjectURL(blob);
                setFile(url);
                setConversation(prev=>[...prev,modelMessage]);
            } catch (error) {
                console.error(error);
            }
        })
    }

    if (isPending) return <Loading/>
    if (isError) return <Error/>
    
    return (
        <form onSubmit={handleSubmit(submitHandler)} 
            className="lg:w-3/5 md:w-4/5 w-full md:mb-0 mb-24">
            <p className="font-semibold text-gray-500 text-xs my-4 md:p-0 p-4">Note: Fill up the fields to generate your AI-powered resume with Google Gemini model</p>
            <div className="grid md:grid-cols-2 grid-cols-1 md:gap-12 gap-4 md:p-0 p-4">
                <div className="flex flex-col space-y-4">
                    <div className="w-full flex md:flex-row flex-col items-start md:gap-4 gap-0">
                        <div className="md:w-1/5 w-full">
                            <p className="font-semibold break-words">Job Title</p>
                        </div>
                        <div className="md:w-4/5 w-full">
                            <input {...register("title")}
                                type="text" className={clsx("w-full h-12 border rounded-lg p-4",
                                                        errors.title 
                                                        ? "border-red-500 hover:border-red-500 focus:outline-red-500" 
                                                        : "border-gray-300 hover:border-gray-300 focus:outline-gray-300"
                                )}/>
                            <p className="text-xs text-red-500 mt-1">{errors.title?.message}</p>
                        </div>
                    </div>
                
                    <div className="w-full flex md:flex-row flex-col items-start md:gap-4 gap-0">
                        <div className="md:w-1/5 w-full">
                            <p className="font-semibold break-words">Job Description</p>
                        </div>
                        <div className="md:w-4/5 w-full">
                            <textarea {...register("jobDescription")}
                                        className={clsx("w-full h-96 border rounded-lg p-4",
                                                        errors.jobDescription 
                                                        ? "border-red-500 hover:border-red-500 focus:outline-red-500" 
                                                        : "border-gray-300 hover:border-gray-300 focus:outline-gray-300"
                                )}/>
                            <p className="text-xs text-red-500 mt-1">{errors.jobDescription?.message}</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <div onDragOver={(e) => {
                            e.preventDefault();
                            setDragging(true);
                        }}
                        onDragLeave={() => setDragging(false)}
                        onDrop={handleDrop}
                        className={clsx("w-full md:h-full h-40 flex items-center justify-center border-2 border-dashed rounded-lg transition",
                            dragging ? "border-blue-500 bg-blue-50" : "border-gray-300",
                            errors.resume ? "border-red-500 hover:border-red-500 focus:outline-red-500" : "border-gray-300"
                        )}>
                        <label className="flex flex-col gap-2 cursor-pointer text-gray-500 text-center">
                            {!fileName ? (
                                <>
                                    <p className="font-medium">
                                        {dragging ? "Drop your resume here" : "Drag your resume here"}
                                    </p>
                                    <p className="text-sm">or click to upload</p>
                                </>
                            ) : (
                                <>
                                    <File className="mx-auto w-16 h-16"/>
                                    {fileName}
                                </>
                            )}

                            <input id="resume"
                                type="file"
                                className="hidden"
                                onChange={(e) => {
                                    if (e.target.files) {
                                        const file = e.target.files[0];
                                        setValue("resume", file, {
                                            shouldValidate: true,
                                            shouldDirty: true
                                        });
                                        setFileName(prev => file.name)
                                    }
                                }}
                            />
                        </label>
                    </div>
                    <p className="text-xs text-red-500 mt-1">{errors.resume?.message as string}</p>
                    <div className="flex justify-end">
                        <button type="submit"
                                className="bg-green-500 w-fit h-12 rounded-lg text-white text-sm px-8 cursor-pointer hover:opacity-80">
                            Generate
                        </button>
                    </div>
                </div>
            </div>

        </form>
    )
}

export default InitialForm;