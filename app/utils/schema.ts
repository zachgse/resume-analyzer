import { z } from "zod";

export const initialFrontend = z.object({
    message: z.string().optional(),
    title: z.string()
            .nonempty("Job title is required"),
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

export const initialBackend = initialFrontend.pick({
    message: true,
    resume: true
})

export const succeedingFrontend = z.object({
    content: z.string()
                .nonempty("Message is required"),
    history: z.any().optional()
});

export const succeedingBackend = succeedingFrontend.pick({
    content: true,
    history: true
})
