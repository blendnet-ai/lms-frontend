import { useEffect, useState } from "react";
import {
  isSignInWithEmailLink,
  sendSignInLinkToEmail,
  signInWithEmailLink,
} from "firebase/auth";
import { auth } from "../configs/firebase";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../configs/routes";

const Login = () => {
  const [email, setEmail] = useState("");
  const [linkSent, setLinkSent] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      let email = window.localStorage.getItem("emailForSignIn");
      if (email) {
        signInWithEmailLink(auth, email, window.location.href)
          .then((_) => {
            window.localStorage.removeItem("emailForSignIn");
            navigate(ROUTES.HOME);
          })
          .catch((error) => {
            console.log("error", error);
          });
      }
    }
  }, []);

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const sendLoginLink = async () => {
    await sendSignInLinkToEmail(auth, email, {
      url: window.location.href,
      handleCodeInApp: true,
    });

    setLinkSent(true);
    window.localStorage.setItem("emailForSignIn", email);
  };

  return (
    <div className="flex w-full h-full min-h-screen">
      <div className="bg-white m-auto mt-20 p-10 px-16 flex flex-col gap-5 rounded-md">
        <h1 className="text-3xl font-bold">Login</h1>
        <h2 className="text-xl">Enter your registered Email ID</h2>
        <input
          className="border p-2"
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          className={`p-2 text-white ${
            linkSent || !isValidEmail(email)
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-500 border rounded border-blue-500 hover:bg-white hover:text-blue-500 transition-all shadow-md"
          }`}
          onClick={sendLoginLink}
          disabled={linkSent || !isValidEmail(email)}
        >
          {linkSent ? "Link Sent" : "Send Login Link"}
        </button>
        <p className={`text-base ${linkSent ? "visible" : "invisible"}`}>
          Login link is sent to your registered email ID
        </p>
        <p className={`text-base ${linkSent ? "visible" : "invisible"}`}>
          Please make sure to open the link in the same browser.
        </p>
      </div>
    </div>
  );
};

export default Login;
