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
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          maxWidth: maxWidth,
          margin: "auto",
          boxShadow: "0px 0px 4px 0px #2952CE69",
          borderRadius: "10px",
        }}
      >
        {data.poweredBy.map((item) => (
          <CardMedia
            component="img"
            sx={{
              objectFit: "contain",
              height: { xs: "auto", md: "120px" },
              width: item.width,
              padding: item.padding,
              borderRight: item.isBorder ? item.border : "none",
            }}
            image={item.image}
            alt="powered by"
          />
        ))}
      </Box>
    </Box>
  );
};

export default PoweredBy;
