import {
  Box,
  Button,
  Chip,
  LinearProgress,
  linearProgressClasses,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { StringUtil } from "../../utils/strings";
import { useDSAPracticeListContext } from "../../hooks/useDSAPracticeListContext";
import styled from "@emotion/styled";

type FilterBarProps = {
  difficulty: string[];
  setDifficulty: (val: string[]) => void;
  topicList: string[];
  selectedTopic: string;
  setSelectedTopic: (val: string) => void;
  companiesList: string[];
  selectedCompany: string;
  setSelectedCompany: (val: string) => void;
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  clearFilters: () => void;
  dsaSheet: number;
  setDsaSheet: (val: number) => void;
  sheetList: { id: number; name: string }[];
};

export default function FilterBar(props: FilterBarProps) {
  const { setRandomQuestion, filteredQues } = useDSAPracticeListContext();

  const handleDifficultyChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value as string[];
    props.setDifficulty(value);
  };

  const handleSelectedTopicChange = (event: SelectChangeEvent) => {
    props.setSelectedTopic(event.target.value);
    setRandomQuestion([]);
  };

  const handleSelectedCompanyChange = (event: SelectChangeEvent) => {
    props.setSelectedCompany(event.target.value);
    setRandomQuestion([]);
  };

  const handleSelectedSheetChange = (event: SelectChangeEvent) => {
    props.setDsaSheet(parseInt(event.target.value));
    setRandomQuestion([]);
  };

  // select a random question from the filtered questions
  const handleRandom = () => {
    if (filteredQues.length > 0) {
      const randomIndex = Math.floor(Math.random() * filteredQues.length);
      const randomQues = filteredQues[randomIndex];
      setRandomQuestion([randomQues]);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "white",
        padding: "20px",
        flexWrap: "wrap",
        rowGap: "10px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "10px",
        }}
      >
        {/* Sheets, and progress bar */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "20px",
          }}
        >
          {/* Sheets dropdown */}
          <Select
            size="small"
            style={{
              borderRadius: "10px",
              width: "150px",
              color: "#2059EE",
            }}
            value={props.dsaSheet.toLocaleString()}
            onChange={handleSelectedSheetChange}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem disabled value={0}>
              DSA Sheets
            </MenuItem>
            {props.sheetList.map((sheet) => {
              return (
                <MenuItem style={{ fontSize: "12px" }} value={sheet.id}>
                  {sheet.name}
                </MenuItem>
              );
            })}
          </Select>
          {/* progress bar  */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <Typography sx={{ fontSize: "14px", fontWeight: "Bold" }}>
              25/100 Questions solved
            </Typography>
            <ProgressBar variant="determinate" value={25} />
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          float: "right",
          gap: "12px",
        }}
      >
        {/* Difficulty  */}
        <Select
          size="small"
          multiple
          value={props.difficulty}
          onChange={handleDifficultyChange}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
          renderValue={(selected) =>
            selected.length === 0 ? (
              <em>Difficulty</em>
            ) : (
              selected.map((value) => (
                <Chip
                  size="small"
                  key={value}
                  label={value.toUpperCase()}
                  style={{ color: "#2059EE" }}
                />
              ))
            )
          }
          style={{
            borderRadius: "10px",
            width: "150px",
            color: "#2059EE",
          }}
        >
          <MenuItem disabled value="">
            <em>Select Difficulty</em>
          </MenuItem>
          {["Basic", "Easy", "Medium", "Hard"].map((level) => (
            <MenuItem key={level} value={level.toLowerCase()}>
              {level}
            </MenuItem>
          ))}
        </Select>
        {/* Topic */}
        <Select
          size="small"
          style={{
            borderRadius: "10px",
            width: "150px",
            color: "#2059EE",
          }}
          value={props.selectedTopic}
          onChange={handleSelectedTopicChange}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem disabled value="">
            Topic
          </MenuItem>
          {props.topicList.map((topic) => {
            return (
              <MenuItem style={{ fontSize: "12px" }} value={topic}>
                {StringUtil.convertKebabToTitleCase(topic)}
              </MenuItem>
            );
          })}
        </Select>
        {/* Company */}
        <Select
          size="small"
          style={{
            borderRadius: "10px",
            width: "150px",
            color: "#2059EE",
            flexWrap: "wrap",
          }}
          value={props.selectedCompany}
          onChange={handleSelectedCompanyChange}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem disabled value="">
            Company
          </MenuItem>
          {props.companiesList.map((company) => {
            if (company === "tcs") return null;
            return (
              <MenuItem style={{ fontSize: "12px" }} value={company}>
                {StringUtil.convertKebabToTitleCase(company)}
              </MenuItem>
            );
          })}
        </Select>
        {/* Clear All */}
        {/* <Button onClick={props.clearFilters}>Clear All</Button> */}
        {/* pick random button */}
        <Button
          variant="contained"
          sx={{
            height: "45px",
            padding: "0px 20px 0px 20px",
            borderRadius: "10px",
            backgroundColor: "#2059EE",
            textTransform: "none",
            color: "white",
            "&:hover": {
              backgroundColor: "#2059EE",
            },
            fontWeight: 550,
          }}
          onClick={handleRandom}
        >
          Pick Random
        </Button>
      </Box>
    </Box>
  );
}

const ProgressBar = styled(LinearProgress)(() => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: "#DCDCE5",
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: "#00995B",
  },
}));
