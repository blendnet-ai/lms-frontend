import * as Sentry from "@sentry/react";
import env from "react-dotenv";
import { auth } from "./configs/firebase";

Sentry.init({
  dsn: env.SENTRY_DSN,
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  tracesSampleRate: 1.0,
  tracePropagationTargets: [
    "localhost",
    /^https:\/\/aspireworks\.blendnet\.ai/,
    /^https:\/\/sakshm\.blendnet\.ai/,
  ],
  environment: env.ENV,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});

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
const originalConsoleLog = console.log;
const originalConsoleError = console.error;

console.log = function (...args) {
  if (env.ENV == "prod") {
    const convertedArgs = convertArgsToJSON(args);
    const userId = auth.currentUser?.uid;
    Sentry.captureMessage(`${userId} ${convertedArgs.join(" ")}`, "log");
  } else {
    originalConsoleLog.apply(console, args);
  }
};

console.error = function (...args) {
  if (env.ENV == "prod") {
    const convertedArgs = convertArgsToJSON(args);
    const userId = auth.currentUser?.uid;
    Sentry.captureException(new Error(`${userId} ${convertedArgs.join(" ")}`));
  } else {
    originalConsoleError.apply(console, args);
  }
};

window.onerror = function (_message, _source, _lineno, _colno, error) {
  Sentry.captureException(error);
};

window.onunhandledrejection = function (event) {
  Sentry.captureException(event.reason);
};
