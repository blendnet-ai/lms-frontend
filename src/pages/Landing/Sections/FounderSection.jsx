import React from "react";
import { images } from "../../../assets";
import { Box, CardMedia } from "@mui/material";
import Founder from "../Components/Founder";

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
            // padding: { xs: "0rem", md: "0rem 8rem", lg: "2rem 16rem" },
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
          gap: "rem",
          width: "100vw",
          overflowX: "scroll",
          overflowY: "hidden",
          scrollSnapType: "x mandatory",
          scrollBehavior: "smooth",
          height: "550px",
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
            image={images.apurv}
            about="Entrepreneur | Ex-CTO Three Wheels United Microsoft Research |"
            illustrationImage={images.founderSectionIllustration1}
            text="In Top Companies, Startups, Academia & Government"
            heading="Domain Expertise"
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
            name="Sanchit Sharma"
            image={images.sanchit}
            about="Head Engineering | Ex-VP Apna Jobs |Microsoft | IIIT Delhi"
            illustrationImage={images.founderSectionIllustration3}
            text="In mentoring, guiding and placing 5K+ candidates"
            heading="Core Experience"
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
            name="Kashish Mittal"
            image={images.kashish}
            about="Technocrat | Former IAS |Microsoft Research | NITI Aayog | IIT Delhi"
            illustrationImage={images.founderSectionIllustration2}
            text="In building cutting-edge AI/ ML and LLM platforms"
            heading="Extensive Network"
            borderColour="#FFEFE3"
          />
        </Box>
      </Box>
    </>
  );
};

export default FounderSection;
