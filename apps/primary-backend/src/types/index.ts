import {z} from "zod";
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

export const ZapCreateSchema = z.object({
    availableTriggerId: z.string(),
    triggerMetadata: z.any().optional(),
    actions: z.array(z.object({
        availableActionId: z.string(),
        actionMetadata: z.any().optional(),
    }))
});