import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
} from "@mui/material";
import { Panel } from "react-resizable-panels";
import DifficultyChip, {
  Difficulty,
} from "../../DifficultyChip/DifficultyChip";
import { ExpandMore } from "@mui/icons-material";
import Tag from "./Tag";

type LeftPanelProps = {
  title: string;
  question: string;
  questionId: number;
  visible: boolean;
  difficulty: Difficulty;
  topics: string[];
  companies: string[];
};

export default function LeftPanel(props: LeftPanelProps) {
  return (
    <Panel
      style={{
        display: props.visible ? "inline" : "none",
      }}
    >
      <Box
        sx={{
          padding: "6px",
        }}
      >
        <DifficultyChip difficulty={props.difficulty} />
      </Box>

      <Box
        sx={{
          padding: "10px 30px 10px 30px",
          borderRadius: "10px",
          border: "1px solid #CFE4FF",
          backgroundColor: "white",
          overflowY: "scroll",
          height: "90%",
        }}
      >
        <h2 style={{ color: "#2059EE", fontWeight: "550" }}>
          #{props.questionId} {props.title}
        </h2>
        <Divider />
        <div
          dangerouslySetInnerHTML={{
            __html: props.question,
          }}
        />
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel1-content"
            id="panel1-header"
            sx={{
              fontWeight: "bold",
            }}
          >
            Company
          </AccordionSummary>
          <AccordionDetails
            sx={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            {props.companies.map((company) => (
              <Tag text={company} />
            ))}
          </AccordionDetails>
        </Accordion>
        <Accordion
          sx={{
            marginBottom: "40px",
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel1-content"
            id="panel1-header"
            sx={{
              fontWeight: "bold",
            }}
          >
            Topic
          </AccordionSummary>
          <AccordionDetails
            sx={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            {props.topics.map((topic) => (
              <Tag text={topic} />
            ))}
          </AccordionDetails>
        </Accordion>
      </Box>
    </Panel>
  );
}
