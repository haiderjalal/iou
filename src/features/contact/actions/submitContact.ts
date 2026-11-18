"use server";

import { headers } from "next/headers";
import { z } from "zod";

import { SITE } from "@/content/site";
import { logger } from "@/lib/logger";
import { isRateLimited } from "@/lib/rateLimit";

import { HONEYPOT_FIELD, STARTED_AT_FIELD } from "../contact.constants";
import { sendContactMessage } from "../services/contact.service";
import { contactSchema, type ContactField } from "../validation/contact.schema";

export interface ContactFormState {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors: Partial<Record<ContactField, string>>;
  /** Echoed back on error so the form can repopulate without client JS. */
  values: Partial<Record<ContactField, string>>;
}

const MIN_FILL_TIME_MS = 3000;
const RATE_LIMIT = { limit: 5, windowMs: 10 * 60 * 1000 };

const SUCCESS_STATE: ContactFormState = {
  status: "success",
  message: "Thank you — your message has been sent. Our team will get back to you soon.",
  fieldErrors: {},
  values: {},
};

function readField(formData: FormData, name: string): string {
  const value = formData.get(name);
  return typeof value === "string" ? value : "";
}

export async function submitContact(_previous: ContactFormState, formData: FormData): Promise<ContactFormState> {
  const values: ContactFormState["values"] = {
    name: readField(formData, "name"),
    email: readField(formData, "email"),
    organisation: readField(formData, "organisation"),
    topic: readField(formData, "topic"),
    message: readField(formData, "message"),
  };

  // Silently accept obvious bot submissions so bots get no signal to adapt.
  const startedAt = Number(readField(formData, STARTED_AT_FIELD));
  const tooFast = Number.isFinite(startedAt) && startedAt > 0 && Date.now() - startedAt < MIN_FILL_TIME_MS;
  if (readField(formData, HONEYPOT_FIELD) !== "" || tooFast) {
    logger.warn("Contact submission rejected as spam", {
      honeypot: readField(formData, HONEYPOT_FIELD) !== "",
      tooFast,
    });
    return SUCCESS_STATE;
  }

  const requestHeaders = await headers();
  const clientIp = requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(`contact:${clientIp}`, RATE_LIMIT)) {
    return {
      status: "error",
      message: "You've sent several messages in a short time. Please wait a few minutes and try again.",
      fieldErrors: {},
      values,
    };
  }

  const parsed = contactSchema.safeParse(values);
  if (!parsed.success) {
    const { fieldErrors } = z.flattenError(parsed.error);
    return {
      status: "error",
      message: "Please check the highlighted fields and try again.",
      fieldErrors: Object.fromEntries(
        Object.entries(fieldErrors).map(([field, messages]) => [field, messages?.[0] ?? "Invalid value."]),
      ),
      values,
    };
  }

  const result = await sendContactMessage(parsed.data);
  if (!result.ok) {
    return {
      status: "error",
      message: `We couldn't send your message right now. Please email us directly at ${SITE.email}.`,
      fieldErrors: {},
      values,
    };
  }

  return SUCCESS_STATE;
}
