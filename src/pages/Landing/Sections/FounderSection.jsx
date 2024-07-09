import React from "react";
import { images } from "../../../assets";
import { Box, CardMedia, Typography } from "@mui/material";
import Founder from "../Components/Founder";

const mobileData = [
  {
    id: 1,
    image: images.founderSectionIllustration1,
    heading: "Core Experience",
    text: "In Mentoring, Guiding And Placing 5K+ Candidates",
    top: "-50px",
    left: "5%",
    right: "0%",
    direction: "row-reverse",
    align: "flex-end",
    textAlign: "right",
  },
  {
    id: 2,
    image: images.founderSectionIllustration2,
    heading: "Extensive Network",
    text: "In Top Companies, Startups, Academia & Government",
    top: "-50px",
    left: "none",
    right: "5%",
    direction: "row",
    align: "flex-start",
    textAlign: "left",
  },
  {
    id: 3,
    image: images.founderSectionIllustration3,
    heading: "Domain Expertise",
    text: "In Building Cutting-Edge AI/ ML And LLM Platforms",
    top: "-50px",
    left: "5%",
    right: "0%",
    direction: "row-reverse",
    align: "flex-end",
    textAlign: "right",
  },
];

const FounderSection = ({ maxWidth, outerPadding }) => {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          padding: outerPadding,
        }}
      >
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: { xs: "1rem", md: "2.5rem" },
            gap: "2rem",
            position: "relative",
            maxWidth: maxWidth,
            margin: "auto",
          }}
        >
          {/* curved Line  */}
          <CardMedia
            component="img"
            sx={{
              position: "absolute",
              bottom: "calc(100% - 286px - 8rem - 50px)",
              left: "200px",
              zIndex: "-1",
              width: "calc(100% - 400px)",
            }}
            image={images.curvedLine}
            alt="curved line"
          />
          <Founder
            name="Apurv Mehra"
            linkedInUrl="https://www.linkedin.com/in/apurvmehra/"
            image={images.apurv}
            about1="Entrepreneur | Ex-CTO"
            about2="Three Wheels United |"
            about3="Microsoft Research | IIT Delhi"
            illustrationImage={images.founderSectionIllustration1}
            text="In Mentoring, Guiding And Placing 5K+ Candidates"
            heading="Core Experience"
            borderColour="#E7EDFF"
          />
          <Founder
            name="Kashish Mittal"
            linkedInUrl="https://www.linkedin.com/in/kashish-mittal-821428247/"
            image={images.kashish}
            about1="Technocrat | Former IAS |"
            about2="NITI Aayog | Microsoft"
            about3="Research | UCSD | IIT Delhi"
            illustrationImage={images.founderSectionIllustration2}
            text="In Top Companies, Startups, Academia & Government"
            heading="Extensive Network"
            borderColour="#FFEFE3"
          />
          <Founder
            name="Sanchit Sharma"
            linkedInUrl="https://www.linkedin.com/in/sanchitsharma98/"
            image={images.sanchit}
            about1="Head Engineering |"
            about2="Ex-Apna Jobs|Microsoft |"
            about3="Zenatix | IIIT Delhi"
            illustrationImage={images.founderSectionIllustration3}
            text="In Building Cutting-Edge AI/ ML And LLM Platforms"
            heading="Domain Expertise"
            borderColour="#FFEFE3"
          />
        </Box>
      </Box>
      {/* Founders section on mobile */}
      <Box
        sx={{
          display: { xs: "flex", md: "none" },
          flexDirection: "row",
          overflowX: "scroll",
          overflowY: "hidden",
          scrollSnapType: "x mandatory",
          scrollBehavior: "smooth",
          padding: "0 0 6rem 0",
        }}
      >
        <Box
          sx={{
            flex: "0 0 80%",
            scrollSnapAlign: "start",
            padding: "0rem 1rem",
          }}
        >
          <Founder
            name="Apurv Mehra"
            linkedInUrl="https://www.linkedin.com/in/apurvmehra/"
            image={images.apurv}
            about1="Entrepreneur | Ex-CTO"
            about2="Three Wheels United |"
            about3="Microsoft Research | IIT Delhi"
            illustrationImage={images.founderSectionIllustration1}
            text="In Mentoring, Guiding And Placing 5K+ Candidates"
            heading="Core Experience"
            borderColour="#E7EDFF"
          />
        </Box>
        <Box
          sx={{
            flex: "0 0 80%",
            scrollSnapAlign: "start",
            padding: "0rem 1rem",
          }}
        >
          <Founder
            name="Kashish Mittal"
            linkedInUrl="https://www.linkedin.com/in/kashish-mittal-821428247/"
            image={images.kashish}
            about1="Technocrat | Former IAS |"
            about2="NITI Aayog | Microsoft"
            about3="Research | UCSD | IIT Delhi"
            illustrationImage={images.founderSectionIllustration2}
            text="In Top Companies, Startups, Academia & Government"
            heading="Extensive Network"
            borderColour="#FFEFE3"
          />
        </Box>
        <Box
          sx={{
            flex: "0 0 80%",
            scrollSnapAlign: "start",
            padding: "0rem 1rem",
          }}
        >
          <Founder
            name="Sanchit Sharma"
            linkedInUrl="https://www.linkedin.com/in/sanchitsharma98/"
            image={images.sanchit}
            about1="Head Engineering |"
            about2="Ex-Apna Jobs|Microsoft |"
            about3="Zenatix | IIIT Delhi"
            illustrationImage={images.founderSectionIllustration3}
            text="In Building Cutting-Edge AI/ ML And LLM Platforms"
            heading="Domain Expertise"
            borderColour="#FFEFE3"
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: { xs: "flex", md: "none" },
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "4rem",
          padding: "2rem 1rem",
        }}
      >
        {mobileData.map((data) => (
          <Box key={data.id} sx={{ position: "relative" }}>
            {/* illustration */}
            <CardMedia
              component="img"
              sx={{
                width: "100px",
                height: "100px",
                objectFit: "contain",
                position: "absolute",
                top: data.top,
                left: data.left,
                right: data.right,
              }}
              image={data.image}
              alt="Mentoring illustration"
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: data.direction,
                padding: "1rem",
                backgroundColor: "white",
                borderRadius: "10px",
                boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                height: "100%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: data.align,
                  width: "60%",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: "1rem",
                    color: "#31A97B",
                    fontWeight: "700",
                    textAlign: data.align,
                  }}
                >
                  {data.heading}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: "1rem",
                    color: "#142349",
                    fontWeight: "600",
                    textAlign: data.textAlign,
                  }}
                >
                  {data.text}
                </Typography>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
      {/* </Box> */}
    </>
  );
};

export default FounderSection;
