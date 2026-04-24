import { z } from "zod";

export const loginSchema = z.object({
    usr: z
        .string()
        .trim()
        .nonempty("Username is required"),
    pwd: z
        .string()
        .trim()
        .min(8, "Password must be at least 8 characters long")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(/[!@#$%^&*]/, "Password must contain at least one special character"),
})

export type LoginFormPayload = z.infer<typeof loginSchema>


export const defaultLoginFormValue: LoginFormPayload = {
    usr: "",
    pwd: "",
}

export interface LoginResponse {
    message: string;
    home_page: string;
    full_name: string;
}

export interface LoginApiPayload extends LoginFormPayload {
    cmd: "login"
}