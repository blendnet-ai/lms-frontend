import { Box, Typography } from "@mui/material";

export enum Difficulty {
  BASIC = "basic",
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

type DifficultyChipProps = {
  difficulty: Difficulty;
};

export default function DifficultyChip(props: DifficultyChipProps) {
  return (
    <Typography
      sx={{
        backgroundColor: (() => {
          if (props.difficulty === Difficulty.BASIC) return "#cce7ff";
          if (props.difficulty === Difficulty.EASY) return "#CCFFEA";
          if (props.difficulty === Difficulty.MEDIUM) return "#FFEFE3";
          if (props.difficulty === Difficulty.HARD) return "#FFE7EC";
        })(),
        color: (() => {
          if (props.difficulty === Difficulty.BASIC) return "#007d99";
          if (props.difficulty === Difficulty.EASY) return "#00995B";
          if (props.difficulty === Difficulty.MEDIUM) return "#FF9140";
          if (props.difficulty === Difficulty.HARD) return "#EC6980";
        })(),
        padding: "5px 15px 5px 15px",
        fontWeight: "600",
        width: "fit-content",
      }}
    >
      {props.difficulty.charAt(0).toUpperCase() + props.difficulty.slice(1)}
    </Typography>
  );
}
