import { Box, CardMedia, Link, Typography } from "@mui/material";
import { icons, images } from "../../assets";

export default function Support() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: "1rem",
        backgroundColor: "#EFF6FF",
        borderTop: "2px solid #fff",
        height: "calc(100vh - 60px)",
      }}
    >
      {/* Top headr  */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: "#2059EE",
          backgroundImage: "linear-gradient(15deg, #2059EE 0%, #6992FF 74%)",
          padding: "2rem 4rem",
          position: "relative",
          borderRadius: "10px",
          height: "170px",
        }}
      >
        {/* Left Side  */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {/* date  */}
          <Typography sx={{ color: "white" }}>
            {new Date().toDateString()}
          </Typography>
          {/* Title  */}
          <Typography
            sx={{
              color: "white",
              fontSize: "18px",
            }}
          >
            Help and Support
          </Typography>
        </Box>
        {/* Right side  */}
        <CardMedia
          component="img"
          image={images.dashboardSupportGirl}
          sx={{
            position: "absolute",
            width: "130px",
            height: "130px",
            cursor: "pointer",
            objectFit: "contain",
            bottom: "0px",
            right: "20px",
          }}
        />
      </Box>

      {/* Content  */}
      <Box
        sx={{
          display: "grid",
          placeItems: "center",
          height: "100%",
        }}
      >
        {/* middle box  */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            padding: "2rem 4rem",
            backgroundColor: "#fff",
            borderRadius: "10px",
            width: "700px",
            boxShadow: "0px 4px 4px 0px #205EFF26",
          }}
        >
          {/* title  */}
          <Typography
            sx={{
              fontSize: "24px",
              fontWeight: "bold",
              color: "#2059EE",
            }}
          >
            Help and Support
          </Typography>
          {/* content  */}
          <Typography
            sx={{
              fontSize: "16px",
              color: "#6E6893",
            }}
          >
            If you're experiencing any issues, have found a bug, or simply have
            some suggestions or feedback you'd like to share, we're all ears!
            Your input is invaluable to us and helps make our platform better
            for everyone.
          </Typography>
          {/* modes  */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {/* email  */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <CardMedia
                component="img"
                image={icons.email}
                sx={{
                  width: "40px",
                  height: "40px",
                  cursor: "pointer",
                  objectFit: "contain",
                  borderRadius: "50%",
                  border: "1px solid #5865F2",
                  padding: "5px",
                }}
              />
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                Reach out via email
                <Typography sx={{ ml: 1, color: "#2059EE" }} component={"span"}>
                  support@blendnet.ai
                </Typography>
              </Typography>
            </Box>
            {/* discord  */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <CardMedia
                component="img"
                image={icons.discord}
                sx={{
                  width: "40px",
                  height: "40px",
                  cursor: "pointer",
                  objectFit: "contain",
                  borderRadius: "50%",
                  border: "1px solid #5865F2",
                  padding: "5px",
                }}
              />
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                Join our vibrant Discord community
                <Typography component={"span"}>
                  <Link
                    sx={{ ml: 1, color: "#2059EE" }}
                    href=" https://discord.gg/2xw4KapQ2v"
                    target="_blank"
                  >
                    https://discord.gg/2xw4KapQ2v
                  </Link>
                </Typography>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
