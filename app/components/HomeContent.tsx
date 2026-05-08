"use client"
import React from "react";
import type { Conversation } from "../utils/types";
import InitialForm from "./form/InitialForm";
import MessageForm from "./form/MessageForm";

const HomeContent = () => {
    const [file,setFile] = React.useState<string>();
    const [conversation,setConversation] = React.useState<Conversation[]>([]);
    const [isError,setIsError] = React.useState<boolean>(false);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            {conversation.length == 0 
                ? <InitialForm setFile={setFile}
                    setConversation={setConversation}
                    isError={isError}
                    setIsError={setIsError}/>
                : <MessageForm file={file}
                                conversation={conversation}
                                setConversation={setConversation}
                                isError={isError}
                                setIsError={setIsError}/>}
        </div>
    )
}

export default HomeContent;