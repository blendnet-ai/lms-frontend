import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { icons, images } from "../../assets/index";
import { CardMedia } from "@mui/material";
import DisplayTextImage from "./Components/DisplayTextImage";
import data from "./data";
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
import Demo from "./Sections/Demo";
import ScrollToTop from "./Components/ScrollToTop";

export default function Landing(props) {
  return (
    <React.Fragment>
      <CssBaseline />
      <Navbar />
      <ScrollToTop />
      {/* Main hero section  */}
      <Hero
        maxWidth="75rem"
        outerPadding={{
          xs: "2rem 2rem",
          sm: "2rem 4rem",
          md: "5rem 8rem 2rem 8rem",
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
        text="Watch DISHA Live In Action!"
        fontSize={{ xs: "20px", md: "40px" }}
        fontWeight="600"
        textWidth={{ xs: "100%", md: "950px" }}
        textAlignment="center"
        marginTop={{ xs: "1rem", md: "4rem" }}
        highlightWordsList={["Live", "In", "Action!"]}
        highlightWordsFontWeight="600"
        padding={{ xs: "0rem 1rem", md: "" }}
        underlineImageUrl={icons.textUnderline}
        underlineImageWords={["Live"]}
        underlineHeight="100%"
        transform={{ xs: "translateX(-15%)", md: "translateX(-13%)" }}
        underlineBottom={{ xs: "-8px", md: "0px" }}
        underlineWidth={{ xs: "140px", md: "260px" }}
        backgroundSize={{ xs: "auto", md: "auto" }}
      />
      {/* demo  */}
      <Demo
        maxWidth="75rem"
        outerPadding={{
          xs: "2rem 1rem",
          sm: "2rem 1rem",
          md: "2rem 8rem",
        }}
      />
      {/* section break text */}
      <DisplayTextImage
        text={`Boost Your Learners’ Technical & Programming Skills With AI!`}
        fontSize={{ xs: "20px", md: "40px" }}
        fontWeight="600"
        textWidth={{ xs: "100%", md: "1000px" }}
        textAlignment="center"
        marginTop={{ xs: "1rem", md: "4rem" }}
        marginBottom={{ xs: "1rem", md: "7rem" }}
        highlightWordsList={["Technical", "&", "Programming"]}
        highlightWordsFontWeight="600"
        padding={{ xs: "0rem 1rem", md: "" }}
        underlineImageUrl={icons.textUnderline}
        underlineImageWords={["Technical"]}
        underlineHeight="100%"
        transform={{ xs: "translateX(-15%)", md: "translateX(-17%)" }}
        underlineBottom={{ xs: "-8px", md: "-15px" }}
        underlineWidth={{ xs: "260px", md: "490px" }}
        placeNewLineAfterWord="Learners’"
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
        text="We Bring Domain Expertise In Building Cutting Edge AI & LLM Platforms"
        fontSize={{ xs: "20px", md: "40px" }}
        fontWeight="600"
        textWidth={{ xs: "100%", md: "800px" }}
        textAlignment="center"
        marginTop={{ xs: "1rem", md: "4rem" }}
        marginBottom={{ xs: "1rem", md: "4rem" }}
        padding={{ xs: "0rem 1rem", md: "0" }}
        highlightWordsList={["Domain", "Expertise"]}
        underlineImageUrl={icons.textUnderline}
        underlineImageWords={["Domain"]}
        underlineHeight="100%"
        transform={{ xs: "translateX(-20%)", md: "translateX(-23%)" }}
        underlineBottom={{ xs: "-0px", md: "-8px" }}
        underlineWidth={{ xs: "180px", md: "360px" }}
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
        text="Trusted By"
        fontSize={{ xs: "20px", md: "40px" }}
        fontWeight="600"
        textWidth={{ xs: "100%", md: "500px" }}
        textAlignment="center"
        marginTop={{ xs: "1rem", md: "4rem" }}
        marginBottom={{ xs: "1rem", md: "4rem" }}
        padding={{ xs: "0rem 1rem", md: "0" }}
        highlightWordsList={["Trusted"]}
        transform={{ xs: "translateX(-50%)", md: "translateX(-48%)" }}
        underlineImageUrl={icons.textUnderline}
        underlineImageWords={["Trusted"]}
        underlineHeight="100%"
        underlineBottom={{ xs: "-8px", md: "-5px" }}
        underlineWidth={{ xs: "70px", md: "155px" }}
        backgroundSize={{ xs: "auto", md: "auto" }}
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
        text="Our Users Love Us! Hear Feedback From Our Thriving Sakshm Community!"
        fontSize={{ xs: "1.5rem", md: "40px" }}
        fontWeight="600"
        padding={{ xs: "0 1rem", md: "4rem 0rem" }}
        textWidth={{ xs: "100%", md: "780px" }}
        textAlignment="center"
        highlightWordsList={["Sakshm"]}
        highlightWordsButNotUnderlinedList={["Community!"]}
        highlightWordsFontFamily="Samark !important"
        underlineImageUrl={icons.textUnderline}
        underlineImageWords={["Sakshm"]}
        underlineHeight="100%"
        transform={{ xs: "translateX(-50%)", md: "translateX(-17%)" }}
        underlineBottom={{ xs: "-0px", md: "-3px" }}
        underlineWidth={{ xs: "100%", md: "340px" }}
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
        underlineImageUrl={icons.textUnderline}
        underlineImageWords={["Highlights"]}
        underlineHeight="100%"
        transform={{ xs: "translateX(-50%)", md: "translateX(-50%)" }}
        underlineBottom={{ xs: "-0px", md: "-10px" }}
        underlineWidth={{ xs: "100%", md: "200px" }}
        backgroundSize="auto"
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
