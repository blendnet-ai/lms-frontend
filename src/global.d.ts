interface Window {
  env: {
    VITE_LMS_BASE_URL: string;
    VITE_ENV: string;
    VITE_SENTRY_DSN: string;
    VITE_FIREBASE_API_KEY: string;
    VITE_FIREBASE_AUTH_DOMAIN: string;
    VITE_FIREBASE_PROJECT_ID: string;
    VITE_FIREBASE_STORAGE_BUCKET: string;
    VITE_FIREBASE_MESSAGING_SENDER_ID: string;
    VITE_FIREBASE_APP_ID: string;
    VITE_FIREBASE_MEASUREMENT_ID: string;
    VITE_GOOGLE_SHEET_BUG_REPORT_URL: string;
    VITE_AUTH_TYPE: "email_link" | "email_password";
    VITE_PARTNER_LOGO: "afh" | "ecf";
    VITE_LMS_PROVIDER: "afh" | "ecf";
  };
}
