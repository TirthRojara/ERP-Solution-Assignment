import { z } from "zod";

export const loginSchema = z.object({
    // email: z.email().trim().min(1, "Email is required"),
    // email: z
    //     .string()
    //     .trim()
    //     .min(1, "Email is required")
    //     .email("Invalid email address"),
    email: z
        .string()
        .trim()
        .nonempty("Email is required")
        .email("Invalid email address"),
    password: z
        .string()
        .trim()
        .min(8, "Password must be at least 8 characters long")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(/[!@#$%^&*]/, "Password must contain at least one special character"),
})

export type LoginFormPayload = z.infer<typeof loginSchema>


export const defaultLoginFormValue: LoginFormPayload = {
    email: "",
    password: "",
}