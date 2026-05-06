"use client"

import React from "react";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { initialMessage } from "@/app/utils/validation";
import { File } from "lucide-react";
import { InitialMessage, Payload } from "@/app/utils/types";

type InitialFormProps = {
    onSubmit: (payload:Payload) => void
}

const InitialForm = ({
    onSubmit
}:InitialFormProps) => {
    const { 
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(initialMessage)
    })

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
        onSubmit({
            type:"initial",
            title:data.title,
            location:data.location,
            jobDescription:data.jobDescription,
            resume:data.resume
        }) 
    }
    
    return (
        <form onSubmit={handleSubmit(submitHandler)} 
            className="lg:w-3/5 md:w-4/5 w-full grid md:grid-cols-2 grid-cols-1 md:gap-12 gap-4 md:p-0 p-4">
            <div className="flex flex-col space-y-4">
                <input type="hidden" value="initial" {...register("type")}/>
                <div className="w-full flex items-start gap-4">
                    <div className="w-1/5">
                        <p className="break-words">Job Title</p>
                    </div>
                    <div className="w-4/5">
                        <input {...register("title")}
                            type="text" className={clsx("w-full h-12 border rounded-lg p-4",
                                                    errors.title 
                                                    ? "border-red-500 hover:border-red-500 focus:outline-red-500" 
                                                    : "border-gray-300 hover:border-gray-300 focus:outline-gray-300"
                            )}/>
                        <p className="text-xs text-red-500 mt-1">{errors.title?.message}</p>
                    </div>
                </div>
                
                <div className="w-full flex items-start gap-4">
                    <div className="w-1/5">
                        <p className="break-words">Location</p>
                    </div>
                    <div className="w-4/5">
                        <input {...register("location")}
                            type="text" className={clsx("w-full h-12 border rounded-lg p-4",
                                                    errors.location 
                                                    ? "border-red-500 hover:border-red-500 focus:outline-red-500" 
                                                    : "border-gray-300 hover:border-gray-300 focus:outline-gray-300"
                            )}/>
                        <p className="text-xs text-red-500 mt-1">{errors.location?.message}</p>
                    </div>
                </div>
                <div className="w-full flex items-start gap-4">
                    <div className="w-1/5">
                        <p className="break-words">Job Description</p>
                    </div>
                    <div className="w-4/5">
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
        </form>
    )
}

export default InitialForm;