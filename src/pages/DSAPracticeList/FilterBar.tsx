import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { StringUtil } from "../../utils/strings";

type FilterBarProps = {
  isHardTicked: boolean;
  setIsHardTicked: (val: boolean) => void;
  isEasyTicked: boolean;
  setIsEasyTicked: (val: boolean) => void;
  isMediumTicked: boolean;
  setIsMediumTicked: (val: boolean) => void;
  topicList: string[];
  selectedTopic: string;
  setSelectedTopic: (val: string) => void;
};

export default function FilterBar(props: FilterBarProps) {
  const handleSetEasyTicked = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setIsEasyTicked(event.target.checked);
  };

  const handleSetMediumTicked = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    props.setIsMediumTicked(event.target.checked);
  };

  const handleSetHardTicked = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setIsHardTicked(event.target.checked);
  };

  const handleSelectedTopicChange = (event: SelectChangeEvent) => {
    props.setSelectedTopic(event.target.value);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "white",
        padding: "20px",
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
        <Typography>Difficulty</Typography>
        <Box sx={{ color: "#2059EE", display: "flex", flexDirection: "row" }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={props.isEasyTicked}
                onChange={handleSetEasyTicked}
                sx={{ color: "#2059EE" }}
              />
            }
            label="Easy"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={props.isMediumTicked}
                onChange={handleSetMediumTicked}
                sx={{ color: "#2059EE" }}
              />
            }
            label="Medium"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={props.isHardTicked}
                onChange={handleSetHardTicked}
                sx={{ color: "#2059EE" }}
              />
            }
            label="Hard"
          />
        </Box>
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
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          float: "right",
          gap: "10px",
        }}
      >
        {/* import button  */}
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#2059EE",
            padding: "12px 20px 12px 20px",
            borderRadius: "10px",
            "&:hover": {
              backgroundColor: "#2059EE",
            },
          }}
        >
          Import
        </Button>
        {/* pick random button */}
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#2059EE",
            padding: "12px 20px 12px 20px",
            borderRadius: "10px",
            "&:hover": {
              backgroundColor: "#2059EE",
            },
          }}
        >
          Pick Random
        </Button>
      </Box>
    </Box>
  );
}
