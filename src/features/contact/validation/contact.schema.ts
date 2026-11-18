import { z } from "zod";

export const CONTACT_TOPICS = [
  "Partnership",
  "Volunteering",
  "Research collaboration",
  "Media enquiry",
  "General enquiry",
] as const;

export type ContactTopic = (typeof CONTACT_TOPICS)[number];

export const CONTACT_LIMITS = {
  nameMax: 100,
  organisationMax: 150,
  messageMin: 20,
  messageMax: 3000,
} as const;

/** Removes control characters (except newlines/tabs in messages) and trims whitespace. */
function stripControlCharacters(value: string, allowNewlines: boolean): string {
  const pattern = allowNewlines ? /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g : /[\u0000-\u001F\u007F]/g;
  return value.replace(pattern, "").trim();
}

const singleLine = (max: number) =>
  z
    .string()
    .transform((value) => stripControlCharacters(value, false))
    .pipe(z.string().max(max, `Please keep this under ${max} characters.`));

export const contactSchema = z.object({
  name: singleLine(CONTACT_LIMITS.nameMax).pipe(z.string().min(2, "Please enter your name.")),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .pipe(z.email("Please enter a valid email address.").max(254, "Please enter a valid email address.")),
  organisation: singleLine(CONTACT_LIMITS.organisationMax).optional().default(""),
  topic: z.enum(CONTACT_TOPICS, "Please choose what your message is about."),
  message: z
    .string()
    .transform((value) => stripControlCharacters(value, true))
    .pipe(
      z
        .string()
        .min(CONTACT_LIMITS.messageMin, `Please write at least ${CONTACT_LIMITS.messageMin} characters.`)
        .max(CONTACT_LIMITS.messageMax, `Please keep your message under ${CONTACT_LIMITS.messageMax} characters.`),
    ),
});

export type ContactInput = z.infer<typeof contactSchema>;

export type ContactField = keyof ContactInput;
