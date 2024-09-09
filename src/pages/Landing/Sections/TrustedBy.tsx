import { Box, CardMedia } from "@mui/material";
import data from "../data";

export default function TrustedBy({ maxWidth }: { maxWidth: string }) {
  return (
    <Box
      sx={{
        width: "100%",
        margin: { xs: "0rem 0rem", md: "4rem 0rem" },
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr 1fr", md: "1fr 1fr 1fr 1fr 1fr" },
          justifyItems: "center",
          gap: "6rem",
          border: "1px solid white",
          padding: "2rem",
          maxWidth: maxWidth,
          margin: "auto",
        }}
      >
        {data.partners.map((item) => (
          <CardMedia
            component="img"
            sx={{
              objectFit: "contain",
              width: "110px",
              height: "110px",
            }}
            image={item.image}
            alt="student"
          />
        ))}
      </Box>
    </Box>
  );
}
