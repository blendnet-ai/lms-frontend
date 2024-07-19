import { Box, Typography } from "@mui/material";

type ListElementProps = {
  head: string;
  content: string | undefined;
};
export default function ListElement(props: ListElementProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: "10px",
        alignItems: "flex-start",
      }}
    >
      <Box
        sx={{
          padding: "10px 0px 10px 0px",
        }}
      >
        <Box
          sx={{
            width: "10px",
            height: "10px",
            backgroundColor: "#2059EE",
            borderRadius: "10px",
          }}
        ></Box>
      </Box>
      <Typography>
        {" "}
        <b>{props.head}: </b>
        {props.content}
      </Typography>
    </Box>
  );
}
