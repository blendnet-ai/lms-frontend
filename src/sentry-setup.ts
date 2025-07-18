import * as Sentry from "@sentry/react";
import { auth } from "./configs/firebase";

Sentry.init({
  dsn: window.env.VITE_SENTRY_DSN,
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  tracesSampleRate: 1.0,
  tracePropagationTargets: [
    "localhost",
    /^https:\/\/aspireworks\.blendnet\.ai/,
    /^https:\/\/sakshm\.com/,
  ],
  environment: window.env.VITE_ENV,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});

const originalConsoleError = console.error;
const userId = auth.currentUser?.uid;

function convertArgsToJSON(args: any[]): string[] {
  return args.map((arg) => {
    if (typeof arg === "object" && arg !== null) {
      try {
        return JSON.stringify(arg, null, 2);
      } catch (e) {
        return "[Circular]";
      }
    }
    return String(arg);
  });
}

console.error = function (...args) {
  if (window.env.VITE_ENV === "local") {
    originalConsoleError.apply(console, args);
  } else {
    const convertedArgs = convertArgsToJSON(args);
    Sentry.captureException(new Error(`${userId} ${convertedArgs.join(" ")}`));
  }
};

window.onerror = function (_message, _source, _lineno, _colno, error) {
  Sentry.captureException(new Error(`${userId} ${error}`));
};

window.onunhandledrejection = function (event) {
  Sentry.captureException(new Error(`${userId} ${event.reason}`));
};
