import {
  GoogleGenAI,
  ThinkingLevel,
  Type,
} from '@google/genai';
import { Conversation } from './types';

const GEMINI_API_KEY=process.env.GOOGLE_GEMINI_API_KEY
const GEMINI_MODEL=process.env.GOOGLE_GEMINI_MODEL

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
    model:GEMINI_MODEL!,
    history,
    config: {
    thinkingConfig: {
      // thinkingLevel: ThinkingLevel.HIGH,
      includeThoughts: true,
    },
    responseMimeType: 'application/json',
    responseSchema: {
      type: Type.OBJECT,
      required: ["message", "topic"],
      properties: {
        message: {
          type: Type.STRING,
          description: "If this is the first message, provide a brief intro. If the user is asking for a revision, provide the FULL revised text/section here using Markdown formatting so the user can use it immediately."
        },
        topic: {
          type: Type.STRING,
          description: "Brief description of what you and the user are talking about (e.g., Summary, Skills, Work History)"
        },
        resume_contents: {
          type: Type.OBJECT,
          description: "ONLY populate this on the very first message. For all subsequent messages, return null.",
          properties: {
            name: { type: Type.STRING },
            info: {
              type: Type.ARRAY,
              items: { type:Type.STRING },
              description: "Contains location, contact number, email address, and personal website/portfolio (if there are)"
            },
            summary: { type: Type.STRING },
            work_experience: {
              type: Type.ARRAY, 
              items: {
                type: Type.OBJECT,
                properties: {
                  position: { type:Type.STRING },
                  company: { type:Type.STRING },
                  others: {
                    type: Type.STRING,
                    description: "Populate only if the user has included technical tools/software that they use on specific work experience"
                  },
                  date_start: { type:Type.STRING },
                  date_end: { type:Type.STRING },
                  highlights: { 
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  }
                }
              }
            },
            skills: {
              type: Type.OBJECT,
              properties: {
                categorized_skills: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      category: { type: Type.STRING },
                      info: { type: Type.ARRAY, items: { type: Type.STRING } }
                    }
                  }
                },
                flat_skills: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                }
              },
              description: "Populate EITHER categorized_skills OR flat_skills based on the input data."
            },
            education: {
              type: Type.ARRAY, 
              items: {
                type: Type.OBJECT,
                properties: {
                  university: { type:Type.STRING },
                  course: { type:Type.STRING },
                  date: { 
                    type:Type.STRING,
                    description: "Just get the end date from the resume"
                  },
                }
              }
            },
            licenses: {
              type: Type.ARRAY, 
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type:Type.STRING },
                  date_issued: { type:Type.STRING },
                },
                description: "Populate only if the user input has license/s section"
              }
            },
            trainings: {
              type: Type.ARRAY, 
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type:Type.STRING },
                  date: { type:Type.STRING },
                  location: { type:Type.STRING }
                },
                description: "Populate only if the user input has training/seminar section"
              }
            },
            projects: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type:Type.STRING },
                  tools: { type:Type.STRING },
                  description: { type:Type.STRING }
                }
              },
              description: "Populate only if the user input has project/s section"
            }
          },
          required: ["name","info","summary","work_experience","skills","education"]
        },
      },
    },
        systemInstruction: [
        {
          text: `
            Role: You are an expert ATS (Applicant Tracking System) Specialist.
            Objective: Transform raw text into high-impact, corporate-standard resumes and assist with iterative improvements.

            OPERATIONAL PROTOCOL:
            1. INITIAL TURN:
              - Populated the 'resume_contents' object with the extracted and enhanced data.
              - Use the 'message' field for a brief professional greeting.
              - Do not include the specific revisions you have made instead just specify the generic changes (e.g. I focused on fixing grammar..., focused on having metrics.. etc)

            2. SUBSEQUENT TURNS (The "Revision Phase"):
              - STICK TO THE 'message' FIELD: Provide all revised content directly here. 
              - FORMATTING: Use Markdown (headers, bullet points, bold text) to make the content copy-paste ready.
              - OMIT 'resume_contents': Do not return the 'resume_contents' key. If your technical implementation requires it, return 'null' or an empty object {}. 
              - DIRECTNESS: If a user asks to "revise the skills," your 'message' should contain the full, updated skills list immediately, not just a description of what you changed.

            3. DATA HYGIENE: 
              - Silently fix PDF conversion artifacts (e.g., "soft-ware" -> "software").
              - Inject quantifiable metrics and keywords based on the target Job Description.
          `
        }
    ],
    }
  })
  const response = await model.sendMessage({ message });

  const parsed = JSON.parse(response.text as string);
  return parsed;
}




