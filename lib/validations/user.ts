import { z } from "zod";
export const userValidations = z.object({
  profile_photo: z.string().url().nonempty(),
  name: z.string().nonempty().min(3).max(30),
  username: z.string().nonempty().min(3).max(30),
  bio: z.string().max(1000),
});
