import {z} from "zod";
export const Signupschema = z.object({
    name : z.string().min(5),
    email: z.string().min(5),
    password: z.string().min(6),
});

export const SigninSchema = z.object({
    name : z.string(), 
    email: z.string(),
    password: z.string()
});