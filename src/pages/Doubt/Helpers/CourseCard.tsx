import { Box, CardMedia, Typography } from "@mui/material";
import { icons } from "../../../assets";
import { useContext } from "react";
import { DoubtSolvingContext } from "../Context/DoubtContext";

type CourseCardProps = {
  name: string;
  desc: string;
  id: number;
  courseProvider?: string;
};

export default function CourseCard(props: CourseCardProps) {
  // Context
  const context = useContext(DoubtSolvingContext);

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
        backgroundColor: "#EFF6FF",
        boxShadow: "0px 2px 1px 0px #EDEDF6",
        border: "none",
        "&:hover": {
          boxShadow: "0px 0px 0px 0px #EDEDF6",
          cursor: "pointer",
          border: "none",
        },
      }}
      onClick={() => context?.setSelectedCourse(props.id)}
    >
      {/* icon  */}
      <CardMedia
        component="img"
        image={icons.course}
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
            fontSize: "16px",
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
            textAlign: "left",
          }}
        >
          {props.desc.length > 100
            ? props.desc.slice(0, 100) + "..."
            : props.desc}
        </Typography>

        {/* provider  */}
        <Typography
          sx={{
            fontSize: "14px",
            color: "#000",
          }}
        >
          {props.courseProvider}
        </Typography>
      </Box>
    </Box>
  );
}
