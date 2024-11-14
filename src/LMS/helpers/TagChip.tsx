import { Typography } from "@mui/material";

const TagChip = ({ title }: { title: string }) => {
  return (
    <Typography
      sx={{
        backgroundColor: "#2059EE",
        color: "#fff",
        padding: "5px 15px 5px 15px",
        fontWeight: "600",
        width: "fit-content",
      }}
    >
      {title}
    </Typography>
  );
};

export default TagChip;
