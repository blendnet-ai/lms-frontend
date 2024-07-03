import {
  Box,
  Button,
  CardMedia,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from "@mui/material";
import React from "react";
import DisplayTextImage from "../Components/DisplayTextImage";
import { images } from "../../../assets";
import data from "../data";

const GetStarted = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url(${images.backgroundLanding})`,
        padding: { xs: "2rem", md: "4rem 10rem" },
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
            fontSize={{ xs: "1rem", md: "1.5rem" }}
            padding={{ xs: "0rem", md: "0rem" }}
            textWidth={{ xs: "100%", md: "100%" }}
            marginTop={{ xs: "0rem", md: "0rem" }}
            marginBottom={{ xs: "0rem", md: "0rem" }}
            highlightWords={["Sakshm.ai!"]}
          />
          {/* Illustrations  */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              padding: "0rem 0rem 2rem 2rem",
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
                    fontSize: "1rem",
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
            <FormControl variant="standard" size="small">
              <OutlinedInput placeholder="Your Name" />
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={age}
                label="Category"
                // onChange={handleChangeCategory}
              >
                <MenuItem value={10}>Candidate</MenuItem>
                <MenuItem value={20}>Company</MenuItem>
                <MenuItem value={30}>College/Institution</MenuItem>
              </Select>
            </FormControl>

            <FormControl variant="standard" size="small">
              <OutlinedInput placeholder="Your Email" />
            </FormControl>

            <FormControl variant="standard" size="small">
              <OutlinedInput
                placeholder="Mobile Number (optional)"
                type="number"
              />
            </FormControl>

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
                backgroundColor: "#3366ff",
                color: "white",
                "&:hover": {
                  backgroundColor: "#3366ff",
                },
              }}
            >
              Get Started
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default GetStarted;
