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
        justifyContent: "space-between",
        marginBottom: "10px",
      }}
    >
      <Typography sx={{ fontWeight: "bold" }}>{label}</Typography>
      <Typography>{value}</Typography>
    </Box>
  );
};

export default DetailTag;
