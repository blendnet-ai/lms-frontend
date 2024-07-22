import { Box } from "@mui/material";
import FilterBar from "./FilterBar";
import { useEffect, useState } from "react";
import QuestionsList from "./QuestionsList";
import DSAPracticeAPI, {
  GetQuestionsResponse,
} from "../../apis/DSAPracticeAPI";
import { DSAPracticeListContextProvider } from "../../Context/DSAPracticeListContext";

export default function DSAPracticeList() {
  const [data, setData] = useState<GetQuestionsResponse | null>(null);

  const fetchData = async () => {
    const data = await DSAPracticeAPI.getQuestions();
    setData(data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const [isHardTicked, setIsHardTicked] = useState(true);
  const [isEasyTicked, setIsEasyTicked] = useState(true);
  const [isMediumTicked, setIsMediumTicked] = useState(true);

  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");

  return (
    <Box
      sx={{
        backgroundColor: "#EFF6FF",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        gap: "20px",
        boxSizing: "border-box",
        padding: "20px 40px 20px 40px",
        minHeight: "90vh",
      }}
    >
      {data && (
        <>
          <h2
            style={{
              alignSelf: "left",
            }}
          >
            DSA Practice
          </h2>
          <DSAPracticeListContextProvider>
            <FilterBar
              setIsHardTicked={setIsHardTicked}
              isHardTicked={isHardTicked}
              setIsEasyTicked={setIsEasyTicked}
              isEasyTicked={isEasyTicked}
              isMediumTicked={isMediumTicked}
              setIsMediumTicked={setIsMediumTicked}
              selectedTopic={selectedTopic}
              setSelectedTopic={setSelectedTopic}
              topicList={data.topics}
              companiesList={data.companies}
              selectedCompany={selectedCompany}
              setSelectedCompany={setSelectedCompany}
            />
            <QuestionsList
              questions={data.questions}
              isHardTicked={isHardTicked}
              isEasyTicked={isEasyTicked}
              isMediumTicked={isMediumTicked}
              selectedTopic={selectedTopic}
              selectedCompany={selectedCompany}
            />
          </DSAPracticeListContextProvider>
        </>
      )}
    </Box>
  );
}
