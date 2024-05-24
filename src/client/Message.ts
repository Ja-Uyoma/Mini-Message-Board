import { z } from "zod";

const MessageSchema = z.object({
    text: z.string(),
    user: z.string(),
    added: z.string().date(),
});

export type Message = z.infer<typeof MessageSchema>;