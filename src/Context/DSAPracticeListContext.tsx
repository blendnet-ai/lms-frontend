import { createContext, ReactNode, useState } from "react";
import { Question } from "../pages/DSAPracticeList/QuestionsList";

interface DSAPracticeListContextProps {
  randomQuestion: Question[];
  setRandomQuestion: React.Dispatch<React.SetStateAction<Question[]>>;
  filteredQues: Question[];
  setFilteredQues: React.Dispatch<React.SetStateAction<Question[]>>;
}

export const DSAPracticeListContext = createContext<
  DSAPracticeListContextProps | undefined
>(undefined);

export const DSAPracticeListContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [randomQuestion, setRandomQuestion] = useState<Question[]>([]);
  const [filteredQues, setFilteredQues] = useState<Question[]>([]);

  return (
    <DSAPracticeListContext.Provider
      value={{
        randomQuestion,
        setRandomQuestion,
        filteredQues,
        setFilteredQues,
      }}
    >
      {children}
    </DSAPracticeListContext.Provider>
  );
};
