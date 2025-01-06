import z from "zod";
export const BACKEND_URL = "http://localhost:3001";
export const HOOKS_URL = "http://localhost:3002"

export const Signupschema = z.object({
    name : z.string().min(3),
    email: z.string().min(5),
    password: z.string().min(3),
});

export const SigninSchema = z.object({
    name : z.string(), 
    email: z.string(),
    password: z.string()
});
