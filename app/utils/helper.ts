import { NewMessage,Payload } from "./types"

export const formatInitialMessage = (data:Payload) => {
    if (data.type === "initial") {
        return `Update my resume for the role of **${data.title}** 

with a **job description of:** 

${data.jobDescription}`
    }
}

export const formatNewMessage = ({role,text}:NewMessage) => {
    return {
        role,
        parts:[{
            text
        }]
    }
}