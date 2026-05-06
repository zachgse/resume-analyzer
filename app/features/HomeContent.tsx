"use client"
import React, { useTransition } from "react";
import type { Conversation, Payload } from "../utils/types";
import InitialForm from "./form/InitialForm";
import MessageForm from "./form/MessageForm";
import { formatInitialMessage, formatNewMessage } from "../utils/helper";

const HomeContent = () => {
    const [isPending,startTransition] = useTransition();
    const [conversation,setConversation] = React.useState<Conversation[]>([]);

    const submitForm = (payload:Payload) => {
        const userMessage = formatNewMessage({
            role:"user",
            text: payload.type === "initial" ? formatInitialMessage(payload) : payload.content
        });
        const updatedConversation = [...conversation,userMessage]; 
        setConversation(updatedConversation); 
        if (payload.type === "initial") {
            const data = {
                type: payload.type,
                title: payload.title,
                location: payload.location,
                jobDescription: payload.jobDescription,
                resume: payload.resume,
                history: updatedConversation
            }
            startTransition(async() => {
                const response = await fetch("/api/analyze", {
                    method:"POST",
                    headers:{
                    "Content-Type":"application/json"
                    },
                    body: JSON.stringify({data})
                }).then(r => r.json());
                await new Promise((r)=>setTimeout(r,3000))
                const modelMessage = formatNewMessage({role:"model",text:response.data})
                setConversation(prev=>[...prev,modelMessage]);
            });
        }
        if (payload.type === "continuous") {
            const data = {
                type: payload.type,
                message: payload.content,
                history: updatedConversation
            }
            startTransition(async() => {
                const response = await fetch("/api/analyze", {
                    method:"POST",
                    headers:{
                    "Content-Type":"application/json"
                    },
                    body: JSON.stringify({data})
                }).then(r => r.json());
                await new Promise((r)=>setTimeout(r,3000))
                const modelMessage = formatNewMessage({role:"model",text:response.data})
                setConversation(prev=>[...prev,modelMessage]);
            })
        }
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            {conversation.length == 0 
                ? <InitialForm onSubmit={submitForm}/> 
                : <MessageForm conversation={conversation}
                                isPending={isPending}
                                onSubmit={submitForm}/>}
        </div>
    )
}

export default HomeContent;