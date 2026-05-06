import { z } from "zod";

export const initialMessage = z.object({
    message: z.string().optional(),
    title: z.string()
            .nonempty("Job title is required"),
    location: z.string()
                .nonempty("Location is required"),
    jobDescription: z.string()
                    .nonempty("Job description is required"),
    resume: z.any()
            .refine((file) => file instanceof File, {
                message: "File is required"
            })
            .refine((file) => file?.size <= 10 * 1024 * 1024, {
                message: "Max file size is 10MB"
            })
            .refine((file) => file?.type === "application/pdf", {
                message: "Only PDF file types are allowed"
            })
});

export const succeedingMessage = z.object({
    content: z.string()
                .nonempty("Message is required"),
    history: z.any()
});

export const modelAnswer = z.object({
    topic: z.string()
            .describe("The specific section of the resume being addressed (e.g., Summary, Skills, Work History) if not specified, just the whole resume itself."),
    subject: z.string()
            .describe("The primary job title or industry the resume is being optimized for."),
    ui_message: z.string()
                .describe("A polite, conversational message to the user explaining what was changed (e.g., 'I updated your experience section to be more results-oriented and metric based.')."),
    revised_resume: z.string()
                    .optional()
                    .describe("ONLY include this AFTER the first user message based on history sent alongside with each request. The full, revised text of the resume in ATS format. This will be processed by the backend into a Word document and will not be shown directly in the chat window."),
    score: z.string()   
            .optional()
            .describe("ONLY include this AFTER the first user message based on history sent alongside with each request. This is overall score of uploaded resume and sent via text in the initial message")
})