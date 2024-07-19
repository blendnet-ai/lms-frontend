import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { icons, images } from "../../assets/index";
import { CardMedia } from "@mui/material";
import DisplayTextImage from "./Components/DisplayTextImage";
import data from "./data";
import StepsCard from "./Components/StepsCard";
import CarouselWrapper from "./Components/CarouselWrapper";
import Testimonial from "./Components/TestimonialCardWrapper";
import Hero from "./Sections/Hero";
import Features from "./Sections/Features";
import Domains from "./Sections/Domains";
import FounderSection from "./Sections/FounderSection";
import StatSection from "./Sections/StatSection";
import GetStarted from "./Sections/GetStarted";
import LandingFooter from "./Sections/LandingFooter";
import Ticker from "./Components/Ticker";
import Navbar from "./Components/Navbar";

export default function Landing(props) {
  return (
    <React.Fragment>
      <CssBaseline />
      <Navbar />
      {/* Main hero section  */}
      <Hero
        maxWidth="75rem"
        outerPadding={{
          xs: "2rem 2rem",
          sm: "2rem 4rem",
          md: "2rem 8rem",
        }}
      />

      {/* Features section */}
      <Features
        maxWidth="75rem"
        outerPadding={{
          xs: "2rem 1rem",
          sm: "2rem 1rem",
          md: "2rem 8rem",
        }}
      />

      {/* section break text */}
      <DisplayTextImage
        text="Top Industry-Led Courses & Certifications For New Age Skills!"
        fontSize={{ xs: "32px", md: "40px" }}
        fontWeight="600"
        textWidth={{ xs: "100%", md: "700px" }}
        textAlignment="center"
        marginTop={{ xs: "1rem", md: "4rem" }}
        marginBottom={{ xs: "1rem", md: "7rem" }}
        highlightWordsList={["Industry-Led", "Courses"]}
        highlightWordsFontWeight="600"
        padding={{ xs: "0rem 1rem", md: "" }}
        underlineImageUrl={icons.textUnderline}
        underlineImageWords={["Industry-Led"]}
        underlineHeight="100%"
        transform={{ xs: "translateX(-50%)", md: "translateX(-30%)" }}
        underlineBottom={{ xs: "-0px", md: "-8px" }}
        underlineWidth={{ xs: "100%", md: "410px" }}
      />
      {/* Domains section */}
      <Domains
        maxWidth="75rem"
        outerPadding={{
          xs: "2rem 1rem",
          sm: "2rem 1rem",
          md: "2rem 8rem",
        }}
      />
      {/* section break text */}
      <DisplayTextImage
        text="We Bring Proven Expertise From Industry, Academia, Policy & Tech!"
        fontSize={{ xs: "1.5rem", md: "40px" }}
        fontWeight="600"
        textWidth={{ xs: "100%", md: "700px" }}
        textAlignment="center"
        marginTop={{ xs: "1rem", md: "4rem" }}
        marginBottom={{ xs: "1rem", md: "4rem" }}
        padding={{ xs: "0rem 1rem", md: "0" }}
        highlightWordsList={["Proven", "Expertise"]}
        underlineImageUrl={icons.textUnderline}
        underlineImageWords={["Proven"]}
        underlineHeight="100%"
        transform={{ xs: "translateX(-20%)", md: "translateX(-20%)" }}
        underlineBottom={{ xs: "-0px", md: "-8px" }}
        underlineWidth={{ xs: "200px", md: "350px" }}
      />
      {/* Founders section */}
      <FounderSection
        maxWidth="75rem"
        outerPadding={{
          xs: "2rem 1rem",
          sm: "2rem 1rem",
          md: "2rem 8rem",
        }}
      />
      {/* section break text */}
      <DisplayTextImage
        text="Enjoy A Seamless, Gamified Experience To Fast Forward Your Career Journey"
        fontSize={{ xs: "1.5rem", md: "40px" }}
        fontWeight="600"
        textWidth={{ xs: "100%", md: "850px" }}
        textAlignment="center"
        marginTop={{ xs: "1rem", md: "4rem" }}
        marginBottom={{ xs: "1rem", md: "4rem" }}
        padding={{ xs: "0rem 1rem", md: "0" }}
        highlightWordsList={["Career", "Journey"]}
        underlineImageUrl={icons.textUnderline}
        underlineImageWords={["Career"]}
        underlineHeight="100%"
        transform={{ xs: "translateX(-20%)", md: "translateX(-20%)" }}
        underlineBottom={{ xs: "-0px", md: "-8px" }}
        underlineWidth={{ xs: "180px", md: "300px" }}
      />
      {/* Onboarding to Placement */}
      <Box
        sx={{
          padding: {
            xs: "2rem 1rem",
            sm: "2rem 1rem",
            md: "2rem 8rem",
          },
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            flexDirection: "column",
            gap: "1rem",
            maxWidth: "75rem",
            margin: "auto",
          }}
        >
          {data.stepsCards.map((step, idx) => (
            <StepsCard
              key={idx}
              count={step.count}
              title={step.title}
              desc={step.desc}
              image={step.image}
              position={step.position}
            />
          ))}
        </Box>

        <Box
          sx={{
            display: { xs: "block", md: "none" },
          }}
        >
          <CarouselWrapper
            showArrows={true}
            indicator={true}
            showArrowPanelBottom={false}
            top="calc(100% - 4.5rem)"
            maxWidth="75rem"
            outerPadding={{
              xs: "0rem 1rem",
            }}
            autoPlay={false}
          >
            {data.stepsCards.map((step, idx) => (
              <StepsCard
                count={step.count}
                title={step.title}
                desc={step.desc}
                image={step.image}
                position={step.position}
              />
            ))}
          </CarouselWrapper>
        </Box>
      </Box>
      {/* section break text */}
      <DisplayTextImage
        text="Meet our Illustrious Hiring & Skilling Partners"
        fontSize={{ xs: "1.5rem", md: "40px" }}
        fontWeight="600"
        textWidth={{ xs: "100%", md: "500px" }}
        textAlignment="center"
        marginTop={{ xs: "1rem", md: "4rem" }}
        marginBottom={{ xs: "1rem", md: "4rem" }}
        padding={{ xs: "0rem 1rem", md: "0" }}
        highlightWordsList={["Partners"]}
        underlineImageUrl={icons.textUnderline}
        underlineImageWords={["Partners"]}
        underlineHeight="100%"
        transform={{ xs: "translateX(-50%)", md: "translateX(-50%)" }}
        underlineBottom={{ xs: "-0px", md: "-0px" }}
        underlineWidth={{ xs: "100%", md: "180px" }}
      />
      {/* Ticker  */}
      <Ticker
        partnersImage={images.partners}
        maxWidth="75rem"
        outerPadding={{
          xs: "2rem 1rem",
          sm: "2rem 1rem",
          md: "2rem 8rem",
        }}
      />
      {/* Stats section */}
      <StatSection
        maxWidth="75rem"
        outerPadding={{
          xs: "2rem 1rem",
          sm: "2rem 1rem",
          md: "2rem 8rem",
        }}
      />
      {/* section break text */}
      <DisplayTextImage
        text="Students Love Us! Hear Feedback From Our Thriving Sakshm.ai Community"
        fontSize={{ xs: "1.5rem", md: "40px" }}
        fontWeight="400"
        padding={{ xs: "0 1rem", md: "4rem 0rem" }}
        textWidth={{ xs: "100%", md: "800px" }}
        textAlignment="center"
        marginTop={{ xs: "1rem", md: "4rem" }}
        highlightWordsList={["Sakshm.ai"]}
        highlightWordsFontFamily="Samark !important"
        underlineImageUrl={icons.textUnderline}
        underlineImageWords={["Sakshm.ai"]}
        underlineHeight="100%"
        transform={{ xs: "translateX(-50%)", md: "translateX(-50%)" }}
        underlineBottom={{ xs: "-0px", md: "-0px" }}
        underlineWidth={{ xs: "100%", md: "180px" }}
        highlightWordsFontWeight="500"
      />
      {/* Testimonials */}
      <Testimonial
        reduceInto={3}
        showArrows={false}
        indicator={false}
        testimonialsData={data.testimonials}
        maxWidth="75rem"
        outerPadding={{
          xs: "2rem 1rem",
          sm: "2rem 1rem",
          md: "2rem 8rem 6rem 8rem",
        }}
      />
      {/* Testimonials on mobile */}
      <Testimonial
        reduceInto={1}
        testimonialsData={data.testimonials}
        showArrows={false}
        indicator={true}
        displayOn="mobile"
        outerPadding={{
          xs: "3rem",
        }}
      />
      {/* section break text */}
      <DisplayTextImage
        text="Sakshm.Ai Highlights"
        fontSize={{ xs: "1.5rem", md: "40px" }}
        fontWeight="400"
        fontFamily="Samark !important"
        textAlignment="center"
        textWidth={{ xs: "100%", md: "60%" }}
        marginTop={{ xs: "1rem", md: "2rem" }}
        marginBottom={{ xs: "1rem", md: "2rem" }}
        highlightWordsList={["Highlights"]}
        highlightWordsFontFamily="Open Sans !important"
        underlineImageUrl={icons.textUnderline}
        underlineImageWords={["Highlights"]}
        underlineHeight="100%"
        transform={{ xs: "translateX(-50%)", md: "translateX(-50%)" }}
        underlineBottom={{ xs: "-0px", md: "-0px" }}
        underlineWidth={{ xs: "100%", md: "180px" }}
      />
      {/* Carousel for images  */}
      <CarouselWrapper
        showArrows={true}
        indicator={true}
        showArrowPanelBottom={false}
        top="calc(100% - 4.5rem)"
        maxWidth="75rem"
        outerPadding={{
          xs: "2rem 1rem",
          sm: "2rem 1rem",
          md: "2rem 8rem",
        }}
      >
        {data.newsImages.map((item, idx) => (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              padding: { xs: "0rem 2rem", md: "0rem 8rem" },
            }}
          >
            <CardMedia
              key={idx}
              component="img"
              sx={{
                objectFit: "contain",
                margin: "0 0 4rem 0",
              }}
              image={item.image}
              alt="news carousel"
            />
          </Box>
        ))}
      </CarouselWrapper>
      {/* Get started  */}
      <GetStarted
        maxWidth="55rem"
        outerPadding={{
          xs: "2rem 1rem",
          sm: "2rem 1rem",
          md: "2rem 8rem 6rem 8rem",
        }}
      />
      {/* Footer */}
      <LandingFooter
        maxWidth="75rem"
        outerPadding={{
          xs: "2rem 1rem",
          sm: "2rem 1rem",
          md: "0rem 6rem 2rem 6rem",
        }}
      />
    </React.Fragment>
  );
}
