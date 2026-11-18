import "server-only";

import { logger } from "@/lib/logger";

import type { ContactInput } from "../validation/contact.schema";

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const REQUEST_TIMEOUT_MS = 8000;

export type SendContactResult = { ok: true } | { ok: false; reason: "not_configured" | "delivery_failed" };

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildEmailHtml(input: ContactInput): string {
  const rows: Array<[string, string]> = [
    ["Name", input.name],
    ["Email", input.email],
    ["Organisation", input.organisation || "—"],
    ["Topic", input.topic],
  ];

  const table = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:4px 12px 4px 0;color:#525b55"><strong>${label}</strong></td><td>${escapeHtml(value)}</td></tr>`,
    )
    .join("");

  return `<div style="font-family:Arial,sans-serif;font-size:15px;color:#16201a">
<h2 style="color:#4b6c26">New message from the IoU website</h2>
<table>${table}</table>
<p style="white-space:pre-wrap;margin-top:16px">${escapeHtml(input.message)}</p>
</div>`;
}

/**
 * Delivers a contact-form submission to the IoU inbox through the Resend REST API.
 * Requires RESEND_API_KEY, CONTACT_TO_EMAIL and CONTACT_FROM_EMAIL (a verified sender).
 */
export async function sendContactMessage(input: ContactInput): Promise<SendContactResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    logger.warn("Contact form email is not configured", { topic: input.topic });
    return { ok: false, reason: "not_configured" };
  }

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        // Set as a JSON field (never a raw header), so user input cannot inject headers.
        reply_to: input.email,
        subject: `[IoU website] ${input.topic} — ${input.name}`,
        html: buildEmailHtml(input),
      }),
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });

    if (!response.ok) {
      logger.error("Contact email delivery failed", { status: response.status });
      return { ok: false, reason: "delivery_failed" };
    }

    logger.info("Contact message delivered", { topic: input.topic });
    return { ok: true };
  } catch (error) {
    logger.error("Contact email request errored", {
      error: error instanceof Error ? error.name : "unknown",
    });
    return { ok: false, reason: "delivery_failed" };
  }
}
