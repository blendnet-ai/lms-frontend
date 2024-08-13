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

  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");
  const [difficulty, setDifficulty] = useState([
    "basic",
    "easy",
    "medium",
    "hard",
  ]);
  const [dsaSheet, setDsaSheet] = useState("");

  const [searchQuery, setSearchQuery] = useState("");

  const clearFilters = () => {
    setSelectedTopic("");
    setSelectedCompany("");
    setDifficulty(["basic", "easy", "medium", "hard"]);
    setDsaSheet("");
  };

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
            Coding and DSA Practice
          </h2>
          <DSAPracticeListContextProvider>
            <FilterBar
              difficulty={difficulty}
              setDifficulty={setDifficulty}
              selectedTopic={selectedTopic}
              setSelectedTopic={setSelectedTopic}
              topicList={data.topics.sort((a, b) => a.localeCompare(b))}
              companiesList={data.companies.sort((a, b) => a.localeCompare(b))}
              // dsaSheetList={data.dsaSheets}
              selectedCompany={selectedCompany}
              setSelectedCompany={setSelectedCompany}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              clearFilters={clearFilters}
            />
            <QuestionsList
              questions={data.questions}
              difficulty={difficulty}
              selectedTopic={selectedTopic}
              selectedCompany={selectedCompany}
              searchQuery={searchQuery}
            />
          </DSAPracticeListContextProvider>
        </>
      )}
    </Box>
  );
}
