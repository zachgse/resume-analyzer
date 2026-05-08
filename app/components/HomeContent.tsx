"use client"
import React from "react";
import type { Conversation } from "../utils/types";
import InitialForm from "./form/InitialForm";
import MessageForm from "./form/MessageForm";

const HomeContent = () => {
    const [file,setFile] = React.useState<string>();
    const [conversation,setConversation] = React.useState<Conversation[]>([]);
    // add error state

    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            {conversation.length == 0 
                ? <InitialForm setFile={setFile}
                    setConversation={setConversation}/>
                : <MessageForm file={file}
                                conversation={conversation}
                                setConversation={setConversation}/>}
        </div>
    )
}

export default HomeContent;