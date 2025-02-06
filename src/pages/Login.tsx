import { useEffect, useState, useMemo } from "react";
import {
  isSignInWithEmailLink,
  sendSignInLinkToEmail,
  signInWithEmailLink,
} from "firebase/auth";
import { auth } from "../configs/firebase";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ROUTES } from "../configs/routes";

const Login = () => {
  const [email, setEmail] = useState("");
  const [linkSent, setLinkSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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

  const isValidEmail = useMemo(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }, [email]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await sendSignInLinkToEmail(auth, email, {
        url: window.location.href,
        handleCodeInApp: true,
      });

      setLinkSent(true);
      window.localStorage.setItem("emailForSignIn", email);
    } catch (error) {
      console.error(error);
      setLinkSent(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex w-full h-full min-h-screen">
      <Card className="bg-white m-auto flex flex-col">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <Button
                type="submit"
                variant={linkSent || !isValidEmail ? "light" : "default"}
                className={`w-full ${
                  linkSent || !isValidEmail ? "cursor-not-allowed" : ""
                }`}
                disabled={linkSent || !isValidEmail || isLoading}
              >
                {isLoading
                  ? "Sending..."
                  : linkSent
                  ? "Link Sent"
                  : "Send Login Link"}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              <p className={`${linkSent ? "visible" : "invisible"}`}>
                Please make sure to open the link in the same browser.
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
