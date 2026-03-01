import { z } from "zod";

export const projectSchema = z.object({
    id: z.coerce.number().optional(), // Jika menggunakan auto-increment ID
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    image_url: z.string().url("Must be a valid URL"),
    deploy_url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
    tech_stack: z.string().min(1, "Tech stack is required"),
});

export const certificateSchema = z.object({
    id: z.coerce.number().optional(), // Jika menggunakan auto-increment ID
    name: z.string().min(1, "Name is required"),
    issuer: z.string().min(1, "Issuer is required"),
    image_url: z.string().url("Must be a valid URL"),
    date: z.string().min(1, "Date is required"),
});

export const experienceSchema = z.object({
    id: z.coerce.number().optional(),
    company: z.string().min(1, "Company is required"),
    role: z.string().min(1, "Role is required"),
    location: z.string().optional().default(""),
    type: z.enum(["Full-time", "Contract", "Freelance", "Internship"]).default("Full-time"),
    start_date: z.string().min(1, "Start date is required"),
    end_date: z.string().optional().or(z.literal("")),
    description: z.string().optional().default("[]"),
    skills: z.string().optional().default(""),
});

export type Project = z.infer<typeof projectSchema>;
export type Certificate = z.infer<typeof certificateSchema>;
export type Experience = z.infer<typeof experienceSchema>;
