import { z } from "zod";

export const initialMessage = z.object({
    type: z.literal("initial"),
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

export const suceedingMessage = z.object({
    type: z.literal("continuous"),
    content: z.string()
                .nonempty("Message is required")
});