import React from "react";
import { images } from "../../../assets";
import { Box, CardMedia } from "@mui/material";
import Founder from "../Components/Founder";

const FounderSection = () => {
  return (
    <>
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          padding: { xs: "0rem", md: "0rem 8rem" },
          marginBottom: { xs: "1rem", md: "2.5rem" },
          gap: "2rem",
          position: "relative",
        }}
      >
        {/* curved Line  */}
        <CardMedia
          component="img"
          sx={{
            position: "absolute",
            // bottom: "10rem",
            bottom: "calc(100% - 200px - 8rem - 50px)",
            left: "0px",
            zIndex: "-1",
            width: "100%",
            padding: "0rem 20rem",
          }}
          image={images.curvedLine}
          alt="curved line"
        />
        <Founder
          name="Apurv Mehra"
          image={images.apurv}
          about="Entrepreneur | Ex-CTO Three Wheels United Microsoft Research |"
          illustrationImage={images.founderSectionIllustration1}
          text="Experience in mentoring, guiding and placing 5,000+ Candidates"
          highlightWords={["Experience"]}
        />
        <Founder
          name="Kashish Mittal"
          image={images.kashish}
          about="Technocrat | Former IAS |Microsoft Research | NITI Aayog | IIT Delhi"
          illustrationImage={images.founderSectionIllustration2}
          text="Extensive Network in Top Companies, Startups, Academia & Government"
          highlightWords={["Network"]}
        />
        <Founder
          name="Sanchit Sharma"
          image={images.avatar}
          about="Head Engineering | Ex-VP Apna Jobs |Microsoft | IIIT Delhi"
          illustrationImage={images.founderSectionIllustration3}
          text="Domain Expertise in building cutting-edge AI/ML and LLM platforms"
          highlightWords={["Expertise", "AI/ML", "LLM"]}
        />
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
          height: "330px",
        }}
      >
        <Box
          sx={{
            flex: "0 0 100%",
            scrollSnapAlign: "start",
          }}
        >
          <Founder
            name="Apurv Mehra"
            image={images.apurv}
            about="Entrepreneur | Ex-CTO Three Wheels United |Microsoft Research | IIIT Delhi"
          />
        </Box>
        <Box
          sx={{
            flex: "0 0 100%",
            scrollSnapAlign: "start",
          }}
        >
          <Founder
            name="Sanchit Mehra"
            image={images.kashish}
            about="Technocrat | Former IAS |Microsoft Research | NITI Aayog | IIT Delhi"
          />
        </Box>
        <Box
          sx={{
            flex: "0 0 100%",
            scrollSnapAlign: "start",
          }}
        >
          <Founder
            name="Kashish Mehra"
            image={"https://avatar.iran.liara.run/public/boy"}
            about="Head Engineering | Ex-VP Apna Jobs|Microsoft | IIIT Delhi"
          />
        </Box>
      </Box>
    </>
  );
};

export default FounderSection;
