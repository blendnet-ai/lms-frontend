import { useEffect } from "react";
import { auth } from "../../configs/firebase";
import env from "react-dotenv";
import { useParams } from "react-router-dom";

const sendAuthTokenToMicrofrontend = async () => {
  const token = await auth.currentUser?.getIdToken();
  const iframe = document.getElementById(
    "microfrontend-iframe"
  ) as HTMLIFrameElement;

  if (iframe && iframe.contentWindow && token) {
    iframe.contentWindow.postMessage({ type: "auth-token", token }, "*");
    console.log("Event sent to CV builder");
  }
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
  const { username, slug } = useParams();
  const iframeSrc = `${env.CV_BUILDER_URL}/${username}/${slug}`;

  return (
    <iframe
      id="microfrontend-iframe"
      allow="clipboard-read; clipboard-write"
      src={iframeSrc}
      title="CV Builder"
      style={{
        width: "100%",
        height: "90vh",
        border: "1px solid #ccc",
        borderRadius: "5px",
      }}
      onLoad={sendAuthTokenToMicrofrontend}
    ></iframe>
  );
}
