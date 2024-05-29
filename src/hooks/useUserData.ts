import { useState, useEffect } from "react";
import { auth } from "./../configs/firebase";

interface UserData {
  name: string | null;
}

const useUserData = (): UserData => {
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user?.displayName) {
        setName(user.displayName);
      }
    });

    return unsubscribe;
  }, []);

  return { name };
};

export default useUserData;
