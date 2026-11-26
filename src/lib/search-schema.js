import { z } from "zod";
import { isSafe } from "@/lib/contact-schema";

const SEARCH_MAX = 1;

export const searchSchema = z
  .string()
  .trim()
  .max(SEARCH_MAX, `Search is limited to ${SEARCH_MAX} characters.`)
  // a half-typed tag is rejected too, so angle brackets never reach the API
  .refine(
    (value) => !/[<>]/.test(value) && isSafe(value),
    "Please remove markup or code.",
  );
