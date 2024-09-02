import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { auth } from "../../configs/firebase";
import { User } from "firebase/auth";
import OnboardingAPI from "../../apis/OnboardingAPI";
import NotRegisteredModal from "../NotRegisteredModal/NotRegisteredModal";

type Props = {
  children: JSX.Element;
};

const ProtectedRoute = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>();
  let location = useLocation();

  const [hasOnboarded, setHasOnboarded] = useState<boolean | null>(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        verifyOnboardingStatus();
      } else {
        setUser(null);
      }
    });
  }, []);

  const verifyOnboardingStatus = () => {
    (async () => {
      let hasOnboarded = await OnboardingAPI.getOnboardingStatus();

      if (hasOnboarded) {
        setHasOnboarded(true);
      } else {
        setHasOnboarded(false);
      }
    })();
  };

  if (user === undefined) {
    return null;
  }
  if (user === null && location.pathname !== "/") {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  if (user === null && location.pathname === "/") {
    return children;
  }
  if (user !== null && location.pathname === "/") {
    return <Navigate to="/dashboard" state={{ from: location }} replace />;
  }
  if (user !== null && hasOnboarded === false) {
    // not checking like !hasOnboarded as null is false in ts
    return <NotRegisteredModal open={true} data={user} />;
  }

  if (user !== null && hasOnboarded === true) {
    return children;
  }
  return null;
};

export default ProtectedRoute;
