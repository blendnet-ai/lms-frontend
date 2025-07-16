/// <reference types="vite/client" />

interface ImportMetaEnv {
  // From your .env file
  readonly BACKEND_BASE_URL: string;
  readonly VITE_AUTH_TYPE: string;

  // From firebase.ts
  readonly VITE_FIREBASE_API_KEY: string;
  readonly VITE_FIREBASE_AUTH_DOMAIN: string;
  readonly VITE_FIREBASE_PROJECT_ID: string;
  readonly VITE_FIREBASE_STORAGE_BUCKET: string;
  readonly VITE_FIREBASE_MESSAGING_SENDER_ID: string;
  readonly VITE_FIREBASE_APP_ID: string;
  readonly VITE_FIREBASE_MEASUREMENT_ID: string;

  // From api.ts
  readonly VITE_GOOGLE_SHEET_BUG_REPORT_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}