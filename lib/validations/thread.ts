import { z } from "zod";

export const ThreadValidation = z.object({
  thread: z
    .string()
    .min(3, {
      message: "Minimum 3 character are required",
    })
    .max(1000, {
      message: "Maximum limit of 1000 reached",
    })
    .nonempty(),
  accountId: z
    .string()
    .min(1, { message: "Account ID is required" })
    .nonempty(),
});
