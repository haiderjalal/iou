/**
 * Minimal structured logger. Emits single-line JSON so logs are searchable on Vercel.
 * Never pass secrets or full personal data in `context`.
 */
type LogLevel = "info" | "warn" | "error";

type LogContext = Record<string, string | number | boolean | null | undefined>;

function write(level: LogLevel, message: string, context?: LogContext): void {
  const entry = JSON.stringify({ level, message, ...context, time: new Date().toISOString() });
  if (level === "error") console.error(entry);
  else if (level === "warn") console.warn(entry);
  else console.info(entry);
}

export const logger = {
  info: (message: string, context?: LogContext) => write("info", message, context),
  warn: (message: string, context?: LogContext) => write("warn", message, context),
  error: (message: string, context?: LogContext) => write("error", message, context),
};
