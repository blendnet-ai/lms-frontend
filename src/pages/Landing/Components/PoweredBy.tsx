import { Box, CardMedia, Typography } from "@mui/material";
import data from "../data";

const PoweredBy = ({ maxWidth }: { maxWidth: string }) => {
  return (
    <Box
      sx={{
        width: "100%",
        margin: { xs: "0rem 0rem", md: "2rem 0rem" },
      }}
    >
      <Typography
        align="center"
        gutterBottom
        sx={{
          fontSize: { xs: "1rem", md: "1.5rem" },
          fontWeight: "600",
          color: "#455A64",
        }}
      >
        Powered By
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr 1fr", md: "1fr 1fr 1fr 1fr" },
          maxWidth: maxWidth,
          margin: "auto",
          boxShadow: "0px 0px 4px 0px #2952CE69",
          borderRadius: "10px",
        }}
      >
        {data.poweredBy.map((item) => (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
              borderRight: item.isBorder ? item.border : "none",
              borderBottom: item.isBorder ? item.border : "none",
            }}
          >
            <CardMedia
              component="img"
              sx={{
                objectFit: "contain",
                width: { xs: "150px", md: "200px" },
                height: { xs: "100px", md: "200px" },
                padding: item.padding,
              }}
              image={item.image}
              alt="powered by"
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default PoweredBy;
