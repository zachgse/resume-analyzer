"use client"
import React, { useTransition } from "react";
import type { Conversation } from "../utils/types";
import InitialForm from "./form/InitialForm";
import MessageForm from "./form/MessageForm";
import { formatInitialMessage, formatNewMessage } from "../utils/helper";

const HomeContent = () => {
    const [isPending,startTransition] = useTransition();
    const [conversation,setConversation] = React.useState<Conversation[]>([]);
    // add error state

    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            {conversation.length == 0 
                ? <InitialForm setConversation={setConversation}
                                startTransition={startTransition}/> //maybe ill pass is pending here to render different loading state
                : <MessageForm conversation={conversation}
                                setConversation={setConversation}
                                startTransition={startTransition}
                                isPending={isPending}/>}
        </div>
    )
}

export default HomeContent;