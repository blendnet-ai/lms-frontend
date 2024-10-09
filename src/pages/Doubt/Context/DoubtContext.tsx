import { createContext, ReactNode, useEffect, useState } from "react";

interface DoubtSolvingProps {
  selectedCourse: number | null;
  setSelectedCourse: (course: number | null) => void;
  selectedMode: number | null;
  setSelectedMode: (mode: number | null) => void;
  userUUID: string | null;
  userKey: string | null;
  referenceObject: any;
  setReferenceObject: (referenceObject: any) => void;
  referenceOpen: boolean;
  setReferenceOpen: (referenceOpen: boolean) => void;
  promptTemplate: string | null;
  setPromptTemplate: (promptTemplate: any) => void;
}

export const DoubtSolvingContext = createContext<DoubtSolvingProps>(null!);

export const DoubtSolvingContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
  const [selectedMode, setSelectedMode] = useState<number | null>(null);
  const [userUUID, setUserUUID] = useState<string | null>(
    localStorage.getItem("user_uuid")
      ? String(localStorage.getItem("user_uuid"))
      : null
  );

  const [userKey, setUserKey] = useState<string | null>(
    localStorage.getItem("user_key")
      ? String(localStorage.getItem("user_key"))
      : null
  );
  const [referenceObject, setReferenceObject] = useState<any>(null);
  const [referenceOpen, setReferenceOpen] = useState<boolean>(false);
  const [promptTemplate, setPromptTemplate] = useState<any>(null);


  return (
    <DoubtSolvingContext.Provider
      value={{
        selectedCourse,
        setSelectedCourse,
        selectedMode,
        setSelectedMode,
        userUUID,
        userKey,
        referenceObject,
        setReferenceObject,
        referenceOpen,
        setReferenceOpen,
        promptTemplate,
        setPromptTemplate,
      }}
    >
      {children}
    </DoubtSolvingContext.Provider>
  );
};
