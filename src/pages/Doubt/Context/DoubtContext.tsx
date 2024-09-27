import { createContext, ReactNode, useEffect, useState } from "react";
import UserDataAPI from "../../../apis/UserDataAPI";

interface DoubtSolvingProps {
  selectedCourse: number | null;
  setSelectedCourse: (course: number | null) => void;
  selectedMode: number | null;
  setSelectedMode: (mode: number | null) => void;
  userId: number | null;
  link: string;
  setLink: (link: string) => void;
  linkOpen: boolean;
  setLinkOpen: (linkOpen: boolean) => void;
}

export const DoubtSolvingContext = createContext<DoubtSolvingProps>(null!);

export const DoubtSolvingContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
  const [selectedMode, setSelectedMode] = useState<number | null>(null);
  const [userId, setUserId] = useState<number | null>(
    localStorage.getItem("user_id")
      ? Number(localStorage.getItem("user_id"))
      : null
  );
  const [link, setLink] = useState<string>("");
  const [linkOpen, setLinkOpen] = useState<boolean>(false);

  // fetch userId
  const fetchUserId = async () => {
    try {
      const data = await UserDataAPI.getOnboardedUserData();
      const fetchedUserId = data.entire_data[0].user_id_id;
      console.log(fetchedUserId);
      setUserId(fetchedUserId);
      localStorage.setItem("user_id", fetchedUserId.toString());
    } catch (error) {
      console.error("Failed to fetch user data", error);
    }
  };

  useEffect(() => {
    const storedUserId = localStorage.getItem("user_id");
    if (storedUserId) {
      setUserId(Number(storedUserId));
    } else {
      fetchUserId();
    }
  }, []); // Removed userId as a dependency to avoid circular updates

  return (
    <DoubtSolvingContext.Provider
      value={{
        selectedCourse,
        setSelectedCourse,
        selectedMode,
        setSelectedMode,
        userId,
        link,
        setLink,
        linkOpen,
        setLinkOpen,
      }}
    >
      {children}
    </DoubtSolvingContext.Provider>
  );
};
