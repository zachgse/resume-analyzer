"use client"

import { File, SendHorizontal } from "lucide-react";
import { Comment } from "react-loader-spinner";
import clsx from "clsx";
import ReactMarkdown from "react-markdown";
import { ContinuousMessage, Conversation } from "@/app/utils/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { succeedingFrontend } from "@/app/utils/schema";
import React, { useTransition } from "react";
import { formatNewMessage } from "@/app/utils/helper";

type MessageFormProps = {
  file: string | undefined
  conversation: Conversation[]
  setConversation: React.Dispatch<React.SetStateAction<Conversation[]>>
}

const MessageForm = ({
  file,
  conversation,
  setConversation
}:MessageFormProps) => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(succeedingFrontend)
  });

  const [isPending,startTransition] = useTransition();

  const submitHandler = (data:ContinuousMessage) => {
    reset();
    const userMessage = formatNewMessage({role:"user",text:data.content});
    const history = [...conversation,userMessage];
    setConversation(prev=>[...prev,userMessage]);
    const payload = {
      message:data.content,
      history
    } 
    try {
      startTransition(async() => {
        const response = await fetch("/api/analyze/continuous", {
            method:"POST",
            body: JSON.stringify(payload),
        }).then(r => r.json());
        const modelMessage = formatNewMessage({role:"model",text:response.message})
        setConversation(prev=>[...prev,modelMessage]);
      })
    } catch (error) {
       console.error(error)
    }
  }

  const handleKeyDown = (e:React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(submitHandler)();
    }
  }

  return (
    <>
      {conversation.length > 0 ? (
        <div className="lg:w-3/5 md:w-4/5 w-full flex flex-1 flex-col gap-4 py-4 md:px-0 px-4">
          {conversation.map((c:Conversation,index:number) => (
          <div key={index} className={clsx("w-full flex", 
                                c.role == "user" ? "justify-end" : "justify-start"
          )}>
            <div className="md:w-3/5 w-4/5 h-fit border border-gray-300 rounded-lg p-4">
              <ReactMarkdown>
                {c.parts[0].text}
              </ReactMarkdown>
              {file && index == 1 && (
                <div className="flex items-end gap-2 mt-5">
                  <File className="w-8 h-8"/>
                  <a href={file} target="_blank" className="text-blue-500 underline">View Generated Resume</a>
                </div>
              )}
            </div>
          </div>
          ))}
          {isPending && (
            <div className="flex justify-start">
              <Comment
                visible={true}
                height="60"
                width="60"
                ariaLabel="comment-loading"
                wrapperStyle={{}}
                wrapperClass="comment-wrapper"
                color="black"
                backgroundColor="#e1e1e1"
                />
            </div>
          )}
        </div>
      ) : (
        <div className="lg:w-3/5 md:w-4/5 w-full flex flex-1 items-center justify-center">
          <p className="text-gray-500">No conversation yet. Send your first message</p>
        </div>
      )}

      <div className="w-full py-4 sticky bottom-0 bg-white md:px-0 px-4">
        <div className="lg:w-3/5 md:w-4/5 w-full mx-auto">
          <form onSubmit={handleSubmit(submitHandler)}
            className="relative">
            <textarea {...register("content")} onKeyDown={handleKeyDown}
                    className={clsx("w-full border  rounded-lg h-40 py-4 ps-4 pe-10",
                      errors.content ? "border-red-500 hover:border-red-500 focus:outline-red-500"
                                    : "border-gray-300 hover:border-gray-300 focus:outline-gray-300"
                    )}/>
            <button 
              type="submit">
              <SendHorizontal className="w-6 h-6 absolute right-4 bottom-20 cursor-pointer"/>
            </button>
          </form>
          <p className="text-xs text-red-500 mt-1">{errors.content?.message}</p>
        </div>
      </div>

    </>
  );
}

export default MessageForm;