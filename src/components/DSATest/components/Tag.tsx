import { Box } from "@mui/material";

type TagProps = {
  text: string;
};

export default function Tag(props: TagProps) {
  return (
    <Box
      sx={{
        backgroundColor: "#EFF6FF",
        width: "fit-content",
        padding: "10px",
        borderRadius: "10px",
      }}
    >
      {props.text}
    </Box>
  );
}
