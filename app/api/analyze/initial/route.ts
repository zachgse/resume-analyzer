import { gemini } from "@/app/utils/googleGemini";
import { extractTextFromResume, formatNewMessage } from "@/app/utils/helper";
import { initialMessage } from "@/app/utils/schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest) {
    try {
        const formData = await request.formData();
        const parsedData = initialMessage.safeParse({
            message: formData.get("message"),
            resume: formData.get("resume")
        });

        if (!parsedData.success) return NextResponse.json({error: parsedData.error.issues},{status:400})


        const { message,resume } = parsedData.data;

        const history = [formatNewMessage({role:"user",text:message})];
        const extractedResume = await extractTextFromResume(resume);
        const formattedMessage = `${message} **My current resume is:** ${extractedResume?.slice(0, 8000)}`; 

        gemini({history,message:formattedMessage});
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