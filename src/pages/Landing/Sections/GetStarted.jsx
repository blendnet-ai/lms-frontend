import {
  Box,
  Button,
  CardMedia,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import DisplayTextImage from "../Components/DisplayTextImage";
import { images } from "../../../assets";
import data from "../data";
import "../landing.css";

const GetStarted = ({ maxWidth = "100%", outerPadding = "0" }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url(${images.backgroundLanding})`,
        padding: outerPadding,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          borderRadius: "10px",
          backgroundColor: "white",
          padding: { xs: "2rem", md: "2rem 4rem" },
          maxWidth: maxWidth,
          margin: "auto",
        }}
      >
        {/* Left side */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            flexDirection: "column",
            width: "50%",
          }}
        >
          <DisplayTextImage
            text="Get Started to power your students with Sakshm.ai!"
            fontSize={{ xs: "1rem", md: "28px" }}
            fontWeight="600"
            textWidth={{ xs: "100%", md: "100%" }}
            marginTop={{ xs: "0rem", md: "0rem" }}
            marginBottom={{ xs: "0rem", md: "0rem" }}
            highlightWords={["Sakshm.ai!"]}
            highlightWordsFontFamily="Samark !important"
          />
          {/* Illustrations  */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
              marginTop: "2rem",
            }}
          >
            {data.modalData.map((data, idx) => (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "2rem",
                }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    width: "80px",
                    objectFit: "contain",
                  }}
                  image={data.image}
                  alt="landing page image"
                />
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#142349",
                  }}
                >
                  {data.text}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
        {/* Right side */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: { xs: "100%", md: "50%" },
          }}
        >
          <Box
            component="form"
            noValidate
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              width: { xs: "100%", md: "80%" },
              margin: { xs: "auto", md: "auto 0 auto auto" },
            }}
          >
            {/* Name  */}
            <TextField
              label="Name"
              size="small"
              placeholder="John Doe"
              type="text"
            />
            {/* Email  */}
            <TextField
              label="Email"
              size="small"
              placeholder="johndoe@gmail.com"
              type="email"
            />
            {/* mobile number optional*/}
            <TextField
              label="Mobile Number"
              size="small"
              placeholder="9876543210"
              type="number"
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Category"
              >
                <MenuItem value={10}>Candidate</MenuItem>
                <MenuItem value={20}>Company</MenuItem>
                <MenuItem value={30}>College/Institution</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Organisation/ Institution name"
              size="small"
              placeholder="Organisation/ Institution name"
              type="text"
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <InputLabel shrink htmlFor="message">
                How can we help you?
              </InputLabel>
              <FormControl variant="standard" size="small">
                <OutlinedInput
                  placeholder="Message"
                  id="message"
                  multiline
                  rows={3}
                />
              </FormControl>
            </Box>
            <Button
              size="large"
              variant="contained"
              sx={{
                width: "100%",
                backgroundColor: "#2059EE",
                color: "white",
                borderRadius: "10px",
                "&:hover": {
                  backgroundColor: "#2059EE",
                },
              }}
            >
              <Typography
                sx={{
                  fontWeight: "700",
                  fontSize: "18px",
                }}
              >
                Get in touch!
              </Typography>
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default GetStarted;
