"use client";

import { CircleAlert, CircleCheck, LoaderCircle, Send } from "lucide-react";
import { startTransition, useActionState, useEffect, useId, useRef, type FormEvent, type ReactNode } from "react";

import { cn } from "@/lib/cn";

import { submitContact, type ContactFormState } from "../actions/submitContact";
import { HONEYPOT_FIELD, STARTED_AT_FIELD } from "../contact.constants";
import { CONTACT_LIMITS, CONTACT_TOPICS, type ContactField } from "../validation/contact.schema";

const INITIAL_STATE: ContactFormState = { status: "idle", message: "", fieldErrors: {}, values: {} };

const INPUT_CLASS =
  "mt-2 block w-full rounded-2xl border-0 bg-white px-4 py-3.5 text-ink shadow-sm ring-1 ring-forest-900/15 transition-shadow placeholder:text-muted/60 focus:ring-2 focus:ring-leaf-600 focus:outline-none aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-red-600";

interface FieldProps {
  id: string;
  label: string;
  error?: string;
  optional?: boolean;
  children: ReactNode;
}

function Field({ id, label, error, optional, children }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="flex items-baseline justify-between text-sm font-bold text-forest-900">
        {label}
        {optional ? <span className="text-xs font-semibold text-muted">Optional</span> : null}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-red-700">
          <CircleAlert className="size-4 shrink-0" aria-hidden />
          {error}
        </p>
      ) : null}
    </div>
  );
}

/**
 * Contact form backed by a Server Action. It works without JavaScript (progressive
 * enhancement); native constraints give instant feedback and Zod re-validates on the server.
 */
export function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContact, INITIAL_STATE);
  const baseId = useId();

  // Records when the form first became interactive; the server rejects instant (bot)
  // submissions.
  const startedAtInputRef = useRef<HTMLInputElement>(null);
  const firstInteractiveAtRef = useRef(0);
  useEffect(() => {
    if (firstInteractiveAtRef.current === 0) firstInteractiveAtRef.current = Date.now();
    if (startedAtInputRef.current) startedAtInputRef.current.value = String(firstInteractiveAtRef.current);
  });

  /**
   * With JavaScript, submit manually inside a transition. Passing the action via `action`
   * alone makes React reset every field after each response, wiping the visitor's input
   * when the server returns validation errors. `action` stays for no-JS submissions.
   */
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => formAction(formData));
  };

  const fieldId = (field: ContactField) => `${baseId}-${field}`;
  const errorProps = (field: ContactField) =>
    state.fieldErrors[field] ? { "aria-invalid": true as const, "aria-describedby": `${fieldId(field)}-error` } : {};

  if (state.status === "success") {
    return (
      <div role="status" className="rounded-[1.75rem] bg-leaf-50 p-10 text-center ring-1 ring-leaf-200">
        <CircleCheck className="mx-auto size-12 text-leaf-700" aria-hidden />
        <h2 className="mt-4 text-2xl font-semibold text-forest-900">Message sent</h2>
        <p className="mt-2 text-muted">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} onSubmit={handleSubmit} className="relative space-y-6">
      {state.status === "error" && state.message ? (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-2xl bg-red-50 p-4 text-sm font-semibold text-red-800 ring-1 ring-red-200"
        >
          <CircleAlert className="mt-0.5 size-5 shrink-0" aria-hidden />
          {state.message}
        </div>
      ) : null}

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id={fieldId("name")} label="Full name" error={state.fieldErrors.name}>
          <input
            id={fieldId("name")}
            name="name"
            type="text"
            autoComplete="name"
            required
            minLength={2}
            maxLength={CONTACT_LIMITS.nameMax}
            defaultValue={state.values.name}
            className={INPUT_CLASS}
            {...errorProps("name")}
          />
        </Field>
        <Field id={fieldId("email")} label="Email address" error={state.fieldErrors.email}>
          <input
            id={fieldId("email")}
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
            defaultValue={state.values.email}
            className={INPUT_CLASS}
            {...errorProps("email")}
          />
        </Field>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id={fieldId("organisation")} label="Organisation" optional error={state.fieldErrors.organisation}>
          <input
            id={fieldId("organisation")}
            name="organisation"
            type="text"
            autoComplete="organization"
            maxLength={CONTACT_LIMITS.organisationMax}
            defaultValue={state.values.organisation}
            className={INPUT_CLASS}
            {...errorProps("organisation")}
          />
        </Field>
        <Field id={fieldId("topic")} label="I'm interested in" error={state.fieldErrors.topic}>
          <select
            id={fieldId("topic")}
            name="topic"
            required
            defaultValue={state.values.topic ?? ""}
            className={cn(INPUT_CLASS, "appearance-auto")}
            {...errorProps("topic")}
          >
            <option value="" disabled>
              Choose a topic
            </option>
            {CONTACT_TOPICS.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field id={fieldId("message")} label="Message" error={state.fieldErrors.message}>
        <textarea
          id={fieldId("message")}
          name="message"
          rows={6}
          required
          minLength={CONTACT_LIMITS.messageMin}
          maxLength={CONTACT_LIMITS.messageMax}
          defaultValue={state.values.message}
          placeholder="Tell us how you'd like to collaborate or what you'd like to know."
          className={cn(INPUT_CLASS, "resize-y")}
          {...errorProps("message")}
        />
      </Field>

      {/* Spam protection: hidden from people and assistive tech. */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${baseId}-${HONEYPOT_FIELD}`}>Leave this field empty</label>
        <input id={`${baseId}-${HONEYPOT_FIELD}`} name={HONEYPOT_FIELD} type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <input ref={startedAtInputRef} type="hidden" name={STARTED_AT_FIELD} defaultValue="" />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">We only use your details to reply to your message.</p>
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-leaf-700 px-7 py-3.5 font-semibold text-white shadow-lg shadow-leaf-900/20 transition-colors hover:bg-leaf-800 disabled:cursor-wait disabled:opacity-70"
        >
          {isPending ? (
            <LoaderCircle className="size-5 animate-spin motion-reduce:animate-none" aria-hidden />
          ) : (
            <Send className="size-4" aria-hidden />
          )}
          {isPending ? "Sending…" : "Send message"}
        </button>
      </div>
    </form>
  );
}
