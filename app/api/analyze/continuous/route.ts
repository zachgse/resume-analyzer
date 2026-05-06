import { gemini } from "@/app/utils/googleGemini";
import { succeedingMessage } from "@/app/utils/schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST (request:NextRequest) {
    try {
        const data = await request.json().then(d => d.data);
        const parsedData = succeedingMessage.safeParse({
            content: data.message,
            history: data.history
        });

        if (!parsedData.success) return NextResponse.json({error: parsedData.error.issues},{status:400})

        const { content,history } = parsedData.data;

        gemini({history,message:content});
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