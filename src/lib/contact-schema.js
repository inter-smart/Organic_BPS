import { z } from "zod";

// Stops zod probing new Function, which the CSP blocks.
z.config({ jitless: true });

const NAME_RE = /^[\p{L}\p{M}]+(?:[ '’.-][\p{L}\p{M}]+)*\.?$/u;
const PHONE_RE = /^\+?[0-9\s\-()]+$/;
const HAS_TEXT_RE = /[\p{L}\p{N}]/u;

const UNSAFE_RES = [
  /<[^>]*>/,
  /javascript:/i,
  /\bon\w+\s*=/i,
  /\{\{[\s\S]*\}\}/,
  /\b(drop|delete|truncate)\s+table\b/i,
  /(;|--)\s*(drop|delete|insert|update|select|alter)\b/i,
  /'\s*or\s*'?\d/i,
];

export const isSafe = (value) => !UNSAFE_RES.some((re) => re.test(value));

const UNSAFE_MESSAGE = "Please remove special markup or code from this field.";

const optionalText = z
  .string()
  .trim()
  .max(150, "Please keep this under 150 characters.")
  .refine(isSafe, UNSAFE_MESSAGE);

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Please enter your name.")
    .transform((value) => value.replace(/\s+/g, " "))
    .pipe(
      z
        .string()
        .min(2, "Your name must be at least 2 characters.")
        .max(100, "Please keep your name under 100 characters.")
        .regex(NAME_RE, "Please use letters only in your name."),
    ),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email.")
    .max(254, "Please keep your email under 254 characters.")
    .pipe(z.email("Please enter a valid email address.")),
  organization: optionalText,
  phone_number: z
    .string()
    .trim()
    .refine(
      (value) => value === "" || PHONE_RE.test(value),
      "Please enter a valid phone number.",
    )
    .refine((value) => {
      if (value === "") return true;
      const digits = value.replace(/\D/g, "");
      return (
        digits.length >= 7 && digits.length <= 15 && !/^(\d)\1+$/.test(digits)
      );
    }, "Please enter a valid phone number."),
  explore_together: optionalText,
  "g-recaptcha-response": z.string().max(4000).optional(),
  message: z
    .string()
    .trim()
    .min(1, "Please enter your message.")
    .pipe(
      z
        .string()
        .min(2, "Your message must be at least 2 characters.")
        .max(2000, "Please keep your message under 2000 characters.")
        .refine(
          (value) => HAS_TEXT_RE.test(value),
          "Please enter a valid message.",
        )
        .refine(isSafe, UNSAFE_MESSAGE),
    ),
});

export function fieldErrors(error) {
  const out = {};
  for (const issue of error.issues) {
    const key = issue.path[0];
    if (key && !out[key]) out[key] = issue.message;
  }
  return out;
}
