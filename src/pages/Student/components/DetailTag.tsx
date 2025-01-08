import { Box, Typography } from "@mui/material";

const DetailTag = ({
  label,
  value,
}: {
  label: string;
  value: string | number | undefined;
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        marginBottom: "10px",
      }}
    >
      <Typography sx={{ fontWeight: "bold" }}>{label}</Typography>
      <Typography
        sx={{
          color: "gray",
          maxWidth: "70%",
          textWrap: "wrap",
          wordWrap: "break-word",
        }}
      >
        {value}
      </Typography>
    </Box>
  );
};

export default DetailTag;
