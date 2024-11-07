import { createContext, ReactNode, useEffect, useState } from "react";

interface MockInterviewProps {
  activeQuestionId: number;
  setActiveQuestionId: (id: number) => void;
}

export const MockInterviewContext = createContext<MockInterviewProps>(null!);

export const MockInterviewContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [activeQuestionId, setActiveQuestionId] = useState<number>(0);

  useEffect(() => {
    const questionId = localStorage.getItem("activeQuestionId");

    if (questionId) {
      setActiveQuestionId(Number(questionId));
    }
  }, []);

  return (
    <MockInterviewContext.Provider
      value={{
        activeQuestionId,
        setActiveQuestionId,
      }}
    >
      {children}
    </MockInterviewContext.Provider>
  );
};
