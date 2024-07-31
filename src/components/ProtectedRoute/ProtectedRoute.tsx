import React, { useEffect, useState } from "react";
import { Navigate, Route, redirect, useLocation } from "react-router-dom";
import { auth } from "../../configs/firebase";
import { User } from "firebase/auth";

type Props = {
  children: JSX.Element;
};

const ProtectedRoute = ({ children }: Props) => {
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
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  if (user !== null && location.pathname === "/") {
    return <Navigate to="/dashboard" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
