import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import EmailLinkLogin from "./EmailLinkLogin";
import EmailPasswordLogin from "./EmailPasswordLogin";

const Login = () => {
  return (
    <div className="flex w-full h-full min-h-screen">
      <Card className="bg-white m-auto flex flex-col">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        {window.env.VITE_AUTH_TYPE === "email_link" && <EmailLinkLogin />}
        {window.env.VITE_AUTH_TYPE === "email_password" && (
          <EmailPasswordLogin />
        )}
      </Card>
    </div>
  );
};

export default Login;
