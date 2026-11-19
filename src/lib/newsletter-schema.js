import { z } from "zod";

export const newsletterSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email.")
    .max(254, "Please keep your email under 254 characters.")
    .pipe(z.email("Please enter a valid email address.")),
  "g-recaptcha-response": z.string().max(4000).optional(),
});
