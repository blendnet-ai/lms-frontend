import * as Sentry from "@sentry/react";
import env from "react-dotenv";

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
    /^https:\/\/sakshm\.com/,
  ],
  environment: env.ENV,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});

const originalConsoleError = console.error;

console.error = function (...args) {
  if (env.ENV === "prod") {
    // console.log("If Block console.error");
    Sentry.captureMessage(args.join(" "));
    return;
  } else {
    // console.log("console.error");
    originalConsoleError.apply(console, args);
  }
};

window.onerror = function (_message, _source, _lineno, _colno, error) {
  // console.log("window.onerror", error);
  Sentry.captureException(error);
};

window.onunhandledrejection = function (event) {
  // console.log("window.onunhandledrejection", event.reason);
  Sentry.captureException(event.reason);
};
