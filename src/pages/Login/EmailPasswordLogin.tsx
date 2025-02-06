import { useState, useMemo } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../configs/firebase";
import { useNavigate } from "react-router-dom";
import { CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ROUTES } from "../../configs/routes";

function EmailPasswordLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const isValidEmail = useMemo(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }, [email]);

  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const onEmailPasswordLogin = () => {
    console.log(email, password);
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate(ROUTES.HOME);
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);

        if (errorCode == "auth/invalid-credential") {
          setShowErrorMessage(true);
        }
      });
  };

  return (
    <CardContent>
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

          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="********"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <p
            className="text-red-500"
            style={{ visibility: showErrorMessage ? "visible" : "hidden" }}
          >
            Invalid credentials
          </p>
        </div>
        <Button
          type="submit"
          variant={!isValidEmail || password.length === 0 ? "light" : "default"}
          className={`w-full ${
            password.length === 0 ? "cursor-not-allowed" : ""
          }`}
          disabled={isValidEmail && password.length === 0}
          onClick={onEmailPasswordLogin}
        >
          Login
        </Button>
      </div>
    </CardContent>
  );
}

export default EmailPasswordLogin;
