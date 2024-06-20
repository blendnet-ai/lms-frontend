import { useEffect } from "react";
import { auth } from "../../configs/firebase";
import env from "react-dotenv";

const sendAuthTokenToMicrofrontend = async () => {
  const token = await auth.currentUser?.getIdToken();
  const iframe = document.getElementById(
    "microfrontend-iframe"
  ) as HTMLIFrameElement;

  setTimeout(() => {
    if (iframe && iframe.contentWindow && token) {
      iframe.contentWindow.postMessage({ type: "auth-token", token }, "*");
      console.log("Event sent to CV builder");
    }
  }, 2000);
};

export default function CVBuilder() {
  useEffect(() => {
    if (auth.currentUser) {
      sendAuthTokenToMicrofrontend();
    }

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        sendAuthTokenToMicrofrontend();
      }
    });

    // Set up an interval to refresh the token periodically
    const tokenRefreshInterval = setInterval(async () => {
      if (auth.currentUser) {
        await auth.currentUser.getIdToken(true); // Force refresh the token
        sendAuthTokenToMicrofrontend();
      }
    }, 30 * 60 * 1000); // 60 minutes

    return () => {
      unsubscribe();
      clearInterval(tokenRefreshInterval);
    };
  }, []);

  return (
    <iframe
      id="microfrontend-iframe"
      src={env.CV_BUILDER_URL}
      title="CV Builder"
      style={{
        width: "100%",
        height: "90vh",
        border: "1px solid #ccc",
        borderRadius: "5px",
      }}
    ></iframe>
  );
}
