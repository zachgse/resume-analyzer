import { extractText } from "unpdf"
import { NewMessage } from "./types"

export const formatInitialMessage = ({
    title,
    jobDescription
}:{
    title:string,
    jobDescription:string
}):string => {
        return `Update my resume for the role of **${title}** 

with a **job description of:** 

${jobDescription}`
}

export const formatNewMessage = ({role,text}:NewMessage) => {
    return {
        role,
        parts:[{
            text
        }]
    }
}

export const extractTextFromResume = async(file:File):Promise<string> => {
    const buffer = new Uint8Array(await file.arrayBuffer());
    const result = await extractText(buffer);
    if (typeof result === "string") return result;
    return result.text.join("\n");
}
