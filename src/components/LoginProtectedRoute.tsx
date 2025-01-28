import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { auth } from "../configs/firebase";
import { User } from "firebase/auth";
import { ROUTES } from "../configs/routes";

type Props = {
  children: JSX.Element;
};

const LoginProtectedRoute = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>();
  let location = useLocation();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  if (user === undefined) {
    return null;
  }
  if (user === null) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }
  return children;
};

export default LoginProtectedRoute;
