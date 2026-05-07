import {
  GoogleGenAI,
  ThinkingLevel,
  Type,
} from '@google/genai';
import { Conversation } from './types';

const GEMINI_API_KEY=process.env.GOOGLE_GEMINI_API_KEY

export async function gemini({
  message,
  history
}:{
  message: string,
  history: Conversation[]
}) {
  const ai = new GoogleGenAI({
    apiKey: GEMINI_API_KEY,
  });
  const model = ai.chats.create({
    model:'gemini-3-flash-preview',
    history,
    config: {
    thinkingConfig: {
      thinkingLevel: ThinkingLevel.HIGH,
      includeThoughts: true,
    },
    responseMimeType: 'application/json',
    responseSchema: {
      type: Type.OBJECT,
      required: ["message", "topic"],
      properties: {
        message: {
          type: Type.STRING,
          description: "Conversational UI friendly message that gets rendered in the frontend explaining to the user what changed (e.g., 'I updated your experience section to be more results-oriented and metric based.')"
        },
        topic: {
          type: Type.STRING,
          description: "brief description of what you and the user are talking about (e.g., Summary, Skills, Work History)"
        },
        resume_contents: {
          type: Type.STRING,
          description: "ONLY include this DURING the first user message based on history sent alongside with each request. The full, revised text of the resume in ATS format. This will be processed by the backend into a Word document and will not be shown directly in the chat window."
        },
      },
    },
    systemInstruction: [
        {
          text: `You are a professional Hiring manager. The users will inquire and send their current resume (once as an initial message alongside with the job details they are seeking). The resume will be sent in text form via pdf to text converter. With that information, I want you to compare their current resume and align it with the job details they have sent. Upon receiving those information, I want you to generate an ATS format resume (via text) and extract all important things from their resume and add keywords,metrics, and special skillsets required for the job that they are seeking.  Also allow the user for further clarifications and revisions along the conversation history. Utilize third party resources to fully give a corporate standard generated resume (e.g. linkedin, jobstreet etc)

For the output, I expect 3 json output:
1. topic(required) - brief description of what you and the user are talking about (e.g., Summary, Skills, Work History)

2. message (required) - Conversational UI friendly message that gets rendered in the frontend explaining to the user what changed (e.g., 'I updated your experience section to be more results-oriented and metric based.').

3. resume_contents - ONLY include this DURING the first user message based on history sent alongside with each request. The full, revised text of the resume in ATS format. This will be processed by the backend into a Word document and will not be shown directly in the chat window.`,
        }
    ],
    }
  })

  const response = await model.sendMessage({ message });

  console.log("response text in gemini: ", response.text);

  const parsed = JSON.parse(response.text as string);
  console.log("response parsed in gemini: ", parsed);
  console.log("parsed message in gemini: ", parsed.message);
  console.log("parsed topic in gemini: ", parsed.topic);
  console.log("parsed res content in gemini: ", parsed.resume_contents);
  return parsed;
}




