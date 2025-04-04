import { z } from "zod";

export const CommentValidation = z.object({
  thread: z
    .string()
    .nonempty()
    .min(3, { message: "Minimum 3 characters" })
    .max(1000, { message: "Maximum characters reached" })
    .nonempty(),
});
