import { Box, Typography } from "@mui/material";
import FilterBar from "./FilterBar";
import React, { useEffect, useState } from "react";
import QuestionsList from "./QuestionsList";
import DSAPracticeAPI, {
  GetQuestionsResponse,
  GetSheetsResponse,
} from "../../apis/DSAPracticeAPI";
import { DSAPracticeListContextProvider } from "../../Context/DSAPracticeListContext";
import SearchBar from "../../components/SearchBar/SearchBar";

const dsaSheetList = [
  { id: 1, name: "sde-sheet" },
  { id: 2, name: "beginner-sheet" },
  { id: 3, name: "love-babbar-sheet" },
];

export default function DSAPracticeList() {
  const [data, setData] = useState<GetQuestionsResponse | null>(null);
  const [sheetsData, setSheetsData] = useState<GetSheetsResponse | null>(null);
  const [dsaSheet, setDsaSheet] = useState(0);

  const fetchData = async () => {
    const data = await DSAPracticeAPI.getQuestions();
    setData(data);
  };

  const fetchSheetsData = async () => {
    const data = await DSAPracticeAPI.getSheets(dsaSheet);
    console.log(data);
    setSheetsData(data);
  };

  useEffect(() => {
    fetchData();
    if (dsaSheet) {
      fetchSheetsData();
    }
  }, [dsaSheet]);

  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");
  const [difficulty, setDifficulty] = useState([
    "basic",
    "easy",
    "medium",
    "hard",
  ]);

  const [searchQuery, setSearchQuery] = useState("");

  const clearFilters = () => {
    setSelectedTopic("");
    setSelectedCompany("");
    setDifficulty(["basic", "easy", "medium", "hard"]);
    setDsaSheet(0);
    setSearchQuery("");
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
        <React.Fragment>
          {/* header component */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: "20px",
                fontWeight: "bold",
                color: "#0A1931",
              }}
            >
              DSA Practice
            </Typography>
            <SearchBar query={searchQuery} setQuery={setSearchQuery} />
          </Box>
          <DSAPracticeListContextProvider>
            <FilterBar
              dsaSheet={dsaSheet}
              setDsaSheet={setDsaSheet}
              difficulty={difficulty}
              setDifficulty={setDifficulty}
              selectedTopic={selectedTopic}
              setSelectedTopic={setSelectedTopic}
              topicList={
                sheetsData?.topics ||
                data.topics
                  .map((topic) => topic.toLowerCase())
                  .filter(
                    (topic, index) => data.topics.indexOf(topic) === index
                  )
                  .sort((a, b) => a.localeCompare(b))
              }
              companiesList={
                sheetsData?.companies ||
                data.companies.sort((a, b) => a.localeCompare(b))
              }
              sheetList={dsaSheetList}
              selectedCompany={selectedCompany}
              setSelectedCompany={setSelectedCompany}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              clearFilters={clearFilters}
            />
            <QuestionsList
              questions={sheetsData?.questions || data.questions}
              difficulty={difficulty}
              selectedTopic={selectedTopic}
              selectedCompany={selectedCompany}
              searchQuery={searchQuery}
            />
          </DSAPracticeListContextProvider>
        </React.Fragment>
      )}
    </Box>
  );
}
