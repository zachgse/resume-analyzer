import { gemini } from "@/app/utils/googleGemini";
import { extractTextFromResume, formatNewMessage } from "@/app/utils/helper";
import { initialBackend } from "@/app/utils/schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest) {
    try {
        const formData = await request.formData();
        const parsedData = initialBackend.safeParse({
            message: formData.get("message"),
            resume: formData.get("resume")
        });

        if (!parsedData.success) return NextResponse.json({error: parsedData.error.issues},{status:400})
            
        const { message,resume } = parsedData.data;

        const history = [formatNewMessage({role:"user",text:message})];
        const extractedResume = await extractTextFromResume(resume);
        const formattedMessage = `${message} **My current resume is:** ${extractedResume?.slice(0, 8000)}`; 
        const response = await gemini({history,message:formattedMessage});
        return NextResponse.json({
            message: response.message,
            resume_contents: response.resume_contents
        }, {
            status: 200
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {
                error: "Something went wrong",
                details: error instanceof Error ? error.message : "Server Error"
            },
            {
                status: 500
            }
        )
    }
}