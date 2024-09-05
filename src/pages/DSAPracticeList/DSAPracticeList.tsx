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

enum AssessmentMode {
  EVALUATION = 0,
  PRACTICE = 1,
}

export default function DSAPracticeList({
  assessmentMode,
}: {
  assessmentMode: AssessmentMode;
}) {
  const [data, setData] = useState<GetQuestionsResponse | null>(null);
  const [sheetsData, setSheetsData] = useState<GetSheetsResponse | null>(null);
  const [dsaSheet, setDsaSheet] = useState(0);

  const fetchData = async () => {
    const data = await DSAPracticeAPI.getQuestions();
    setData(data);
  };

  const fetchSheetsData = async () => {
    const data = await DSAPracticeAPI.getSheets(dsaSheet);
    setSheetsData(data);
  };

  const fetchLabQuestions = async () => {
    const data = await DSAPracticeAPI.getLabQuestions();
    setData(data);
  };

  useEffect(() => {
    if (assessmentMode == AssessmentMode.EVALUATION) {
      fetchLabQuestions();
    } else {
      fetchData();
    }
  }, [assessmentMode]);

  useEffect(() => {
    if (dsaSheet > 0) {
      fetchSheetsData();
    } else {
      setSheetsData(null);
    }
  }, [dsaSheet]);

  const [selectedTopic, setSelectedTopic] = useState<string[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<string[]>([]);
  const [difficulty, setDifficulty] = useState<string[]>([]);

  const [searchQuery, setSearchQuery] = useState("");

  const clearFilters = () => {
    setSelectedTopic([]);
    setSelectedCompany([]);
    setDifficulty([]);
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
              {assessmentMode == AssessmentMode.EVALUATION
                ? "DSA Lab"
                : "DSA Practice"}
            </Typography>
            <SearchBar query={searchQuery} setQuery={setSearchQuery} />
          </Box>
          <DSAPracticeListContextProvider>
            <FilterBar
              dsaSheet={
                assessmentMode == AssessmentMode.EVALUATION ? 0 : dsaSheet
              }
              setDsaSheet={
                assessmentMode == AssessmentMode.EVALUATION
                  ? () => {}
                  : setDsaSheet
              }
              difficulty={difficulty}
              setDifficulty={setDifficulty}
              selectedTopic={selectedTopic}
              setSelectedTopic={setSelectedTopic}
              topicList={
                sheetsData?.topics ||
                data.topics.sort((a, b) => a.localeCompare(b))
              }
              companiesList={
                sheetsData?.companies ||
                data.companies.sort((a, b) => a.localeCompare(b))
              }
              sheetList={
                assessmentMode == AssessmentMode.EVALUATION
                  ? []
                  : data.dsa_sheet_names
              }
              selectedCompany={selectedCompany}
              setSelectedCompany={setSelectedCompany}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              clearFilters={clearFilters}
              questions_solved={
                assessmentMode == AssessmentMode.EVALUATION
                  ? 0
                  : sheetsData?.sheet_status.solved_count
              }
              total_questions={
                assessmentMode == AssessmentMode.EVALUATION
                  ? 0
                  : sheetsData?.sheet_status.total_questions
              }
              isLab={assessmentMode == AssessmentMode.EVALUATION}
            />
            <QuestionsList
              questions={sheetsData?.questions || data.questions}
              difficulty={difficulty}
              selectedTopic={selectedTopic}
              selectedCompany={selectedCompany}
              searchQuery={searchQuery}
              assessmentMode={assessmentMode}
            />
          </DSAPracticeListContextProvider>
        </React.Fragment>
      )}
    </Box>
  );
}
