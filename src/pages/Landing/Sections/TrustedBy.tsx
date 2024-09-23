import { Box, CardMedia, Typography } from "@mui/material";
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
          display: { xs: "none", md: "grid" },
          gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
          justifyItems: "center",
          gap: { xs: "3rem", md: "5.5rem" },
          border: "1px solid white",
          padding: "2rem",
          maxWidth: maxWidth,
          margin: "auto",
        }}
      >
        {data.partners
          .filter((item) => item.name !== "KTC")
          .map((item) => (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <CardMedia
                component="img"
                sx={{
                  objectFit: "contain",
                  width: { xs: "50px", md: "100px" },
                  height: { xs: "50px", md: "100px" },
                }}
                image={item.image}
                alt="student"
              />
              <Typography
                sx={{
                  color: "black",
                  textAlign: "center",
                  marginTop: "1rem",
                  fontSize: { xs: "14px", md: "20px" },
                }}
              >
                {item.name}
              </Typography>
            </Box>
          ))}
      </Box>

      {/* mobile */}
      <Box
        sx={{
          display: { xs: "grid", md: "none" },
          gridTemplateColumns: "1fr 1fr 1fr",
          justifyItems: "center",
          gap: { xs: "3rem", md: "5.5rem" },
          border: "1px solid white",
          padding: "2rem",
          maxWidth: maxWidth,
          margin: "auto",
        }}
      >
        {data.partners.map((item) => (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <CardMedia
              component="img"
              sx={{
                objectFit: "contain",
                width: { xs: "50px", md: "100px" },
                height: { xs: "50px", md: "100px" },
              }}
              image={item.image}
              alt="student"
            />
            <Typography
              sx={{
                color: "black",
                textAlign: "center",
                marginTop: "1rem",
                fontSize: { xs: "14px", md: "20px" },
              }}
            >
              {item.name}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
