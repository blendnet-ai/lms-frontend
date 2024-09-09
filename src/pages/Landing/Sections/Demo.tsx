import { Box, CardMedia, Typography } from "@mui/material";
import data from "../data";

export default function Demo({
  maxWidth,
  outerPadding,
}: {
  maxWidth: string;
  outerPadding: string | {};
}) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        padding: outerPadding,
      }}
    >
      {/* Inner content  */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          borderRadius: "20px",
          maxWidth: maxWidth,
          margin: "auto",
          width: "100%",
          gap: "4rem",
        }}
      >
        {/* left  */}
        <Box
          sx={{
            width: { xs: "100%", md: "60%" },
            display: "flex",
            backgroundColor: "#D9D9D9",
            height: "auto",
            borderRadius: "20px",
          }}
        >
          <iframe
            width={"100%"}
            height={"100%"}
            src="https://www.youtube.com/embed/urBRGc7ZJHA"
            title="Sakshm AI Tutor for Technical & Programming Skills | Demo"
            frameBorder={0}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen={true}
          />
        </Box>
        {/* right  */}
        <Box
          sx={{
            width: { xs: "100%", md: "40%" },
            display: "flex",
            flexDirection: "column",
            gap: "4rem",
            padding: { xs: "0rem 0rem 0rem 3.5rem", md: "0 2rem" },
            justifyContent: "space-between",
          }}
        >
          {data.demoData.map((item, idx) => (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
                position: "relative",
                border: `2px solid ${item.borderColor}`,
                boxShadow: "0px 0px 19.9px 1px #153A731C",
                borderRadius: "5px",
                padding: {
                  xs: "1rem 1rem 1rem 2.5rem",
                  md: "1rem 1rem 1rem 4.5rem",
                },
              }}
            >
              <CardMedia
                key={idx}
                component="img"
                sx={{
                  objectFit: "contain",
                  width: { xs: "85px", md: "100px" },
                  height: "auto",
                  position: "absolute",
                  left: "-60px",
                  top: "0",
                }}
                image={item.image}
                alt={item.title}
              />
              <Typography
                sx={{
                  fontSize: { xs: "14px", md: "20px" },
                  fontWeight: "700",
                  color: "#1C1C1C",
                  textAlign: "left",
                }}
              >
                {item.title}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
