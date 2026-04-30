"use client"
import React from "react";
import { formatNewMessage } from "./utils/helper";
import { SendHorizontal } from "lucide-react";
import { Comment } from "react-loader-spinner";
import clsx from "clsx";
import ReactMarkdown from "react-markdown";

type Conversation = {
  role: "user" | "model"
  parts: {
    text: string
  }[]
}

export default function Home() {
  const [conversation,setConversation] = React.useState<Conversation[]>([]);
  const [message,setMessage] = React.useState<string>(""); 
  const [loading,setLoading] = React.useState<boolean>(false);

  const handleSubmit = async() => {
    setMessage("");
    setLoading(true);
    const userMessage = formatNewMessage({role:"user",text:message});
    const updatedConversation = [...conversation,userMessage]
    setConversation(updatedConversation);
    const response = await fetch("/api/analyze",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        message,
        history: updatedConversation
      })
    });
    const data = await response.json();
    const modelMessage = formatNewMessage({role:"model",text:data.data})
    setLoading(false);
    setConversation(prev=>[
      ...prev,modelMessage
    ]);

    console.log("Data is: ", data);
  }

  return (
    <div className="h-screen flex flex-col items-center mx-auto">
      {conversation.length > 0 ? (
        <div className="lg:w-3/5 md:w-4/5 w-full flex flex-1 flex-col gap-4 py-4 md:px-0 px-4">
          {conversation.map((c:Conversation,index:number) => (
          <div key={index} className={clsx("w-full flex", 
                                c.role == "user" ? "justify-end" : "justify-start"
          )}>
            <div className="md:w-3/5 w-4/5 h-fit border border-gray-300 rounded-lg p-4">
              {c.role === "model" ? (
                <div className="prose max-w-none">
                  <ReactMarkdown>
                    {c.parts[0].text}
                  </ReactMarkdown>
                </div>
              ) : (
                <p>{c.parts[0].text}</p>
              )}
            </div>
          </div>
          ))}
          {loading && (
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
          <div className="relative">
            <textarea onChange={(e)=>setMessage(e.target.value)} value={message} 
                    className="w-full border border-gray-300 rounded-lg h-40 py-4 ps-4 pe-10"/>
            <SendHorizontal onClick={handleSubmit} className="w-6 h-6 absolute right-4 bottom-20 cursor-pointer"/>
          </div>
        </div>
      </div>

    </div>
  );
}
