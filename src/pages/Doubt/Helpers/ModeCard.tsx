import { Box, CardMedia, Typography } from "@mui/material";
import { useContext } from "react";
import { DoubtSolvingContext } from "../Context/DoubtContext";

type ModeCardProps = {
  name: string;
  desc: string;
  id: number;
  image: string;
  locked: boolean;
};

export default function ModeCard(props: ModeCardProps) {
  // Context
  const context = useContext(DoubtSolvingContext);

  const handleClick = () => {
    if (!props.locked) {
      context?.setSelectedMode(props.id);
    }
  };

  return (
    <Box
      component={"button"}
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        gap: "10px",
        padding: "10px",
        borderRadius: "10px",
        backgroundColor: props.locked
          ? "lightgrey"
          : context?.selectedMode !== props.id
          ? "#fff"
          : "#EFF6FF",
        opacity: props.locked ? 0.5 : 1,
        boxShadow: "0px 2px 1px 0px #EDEDF6",
        border: "none",
        cursor: props.locked ? "not-allowed" : "pointer",
        transition: "all 0.3s",
        "&:hover": {
          backgroundColor: props.locked ? "lightgrey" : "#EFF6FF",
          boxShadow: props.locked
            ? "0px 2px 1px 0px #EDEDF6"
            : "0px 0px 0px 0px #EDEDF6",
          cursor: props.locked ? "not-allowed" : "pointer",
          border: "none",
        },
      }}
      onClick={handleClick}
    >
      {/* icon  */}
      <CardMedia
        component="img"
        image={props.image}
        sx={{
          width: "40px",
          height: "40px",
          objectFit: "contain",
        }}
      />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        {/* title  */}
        <Typography
          sx={{
            fontSize: "20px",
            fontWeight: "bold",
            color: "#000",
          }}
        >
          {props.name}
        </Typography>

        {/* description  */}
        <Typography
          sx={{
            fontSize: "14px",
            color: "#000",
          }}
        >
          {props.desc}
        </Typography>
      </Box>
    </Box>
  );
}
