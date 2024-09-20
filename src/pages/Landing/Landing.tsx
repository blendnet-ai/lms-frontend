import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import DisplayTextImage from "./Components/DisplayTextImage";
import Hero from "./Sections/Hero";
import Features from "./Sections/Features";
import Domains from "./Sections/Domains";
import FounderSection from "./Sections/FounderSection";
import Stats from "./Sections/StatSection";
import GetStarted from "./Sections/GetStarted";
import LandingFooter from "./Sections/LandingFooter";
import Navbar from "./Components/Navbar";
import Demo from "./Sections/Demo";
import ScrollToTop from "./Components/ScrollToTop";
import TrustedBy from "./Sections/TrustedBy";
import PoweredBy from "./Components/PoweredBy";

export default function Landing() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Navbar />
      <ScrollToTop />
      {/* Main hero section  */}
      <Hero
        maxWidth="70rem"
        outerPadding={{
          xs: "2rem 2rem",
          sm: "2rem 4rem",
          md: "2rem 8rem 0rem 8rem",
        }}
      />

      {/* Features section */}
      <Features
        maxWidth="70rem"
        outerPadding={{
          xs: "2rem 1rem",
          sm: "2rem 1rem",
          md: "2rem 8rem 0rem 8rem",
        }}
      />

      {/* section break text */}
      <DisplayTextImage
        text="Watch DISHA Live In Action!"
        fontSize={{ xs: "20px", md: "34px" }}
        fontWeight="700"
        textWidth={{ xs: "100%", md: "100%" }}
        textAlignment="center"
        marginTop={{ xs: "1rem", md: "4rem" }}
        marginBottom={{ xs: "1rem", md: "4rem" }}
        highlightWordsList={["Live", "In", "Action!"]}
        highlightWordsFontWeight="700"
        padding={{ xs: "0rem 1rem", md: "0" }}
      />
      {/* demo  */}
      <Demo
        maxWidth="70rem"
        outerPadding={{
          xs: "2rem 1rem",
          sm: "2rem 1rem",
          md: "0rem 8rem ",
        }}
      />
      {/* section break text */}
      <DisplayTextImage
        text={`Leverage DISHA To Boost Your Technical & Programming Skills! `}
        fontSize={{ xs: "20px", md: "34px" }}
        fontWeight="700"
        textWidth={{ xs: "100%", md: "100%" }}
        textAlignment="center"
        marginTop={{ xs: "1rem", md: "7rem" }}
        marginBottom={{ xs: "1rem", md: "7rem" }}
        highlightWordsList={["Technical", "&", "Programming"]}
        highlightWordsFontWeight="700"
        padding={{ xs: "0rem 1rem", md: "" }}
        placeNewLineAfterWord="Your"
      />
      {/* Domains section */}
      <Domains
        maxWidth="85rem"
        outerPadding={{
          xs: "2rem 1rem",
          sm: "2rem 1rem",
          md: "2rem 8rem",
        }}
      />
      {/* section break text */}
      <DisplayTextImage
        text="We Bring Domain Expertise From Industry To Level Up Your Career Growth!"
        fontSize={{ xs: "20px", md: "40px" }}
        fontWeight="700"
        textWidth={{ xs: "100%", md: "100%" }}
        textAlignment="center"
        marginTop={{ xs: "1rem", md: "4rem" }}
        marginBottom={{ xs: "1rem", md: "4rem" }}
        padding={{ xs: "0rem 1rem", md: "0" }}
        highlightWordsList={["Domain", "Expertise"]}
        highlightWordsFontWeight="700"
        placeNewLineAfterWord="Industry"
      />
      {/* Founders section */}
      <FounderSection
        maxWidth="85rem"
        outerPadding={{
          xs: "2rem 1rem",
          sm: "2rem 1rem",
          md: "2rem 8rem",
        }}
      />
      {/* section break text */}
      <DisplayTextImage
        text="Trusted By Top Colleges And Companies"
        fontSize={{ xs: "20px", md: "40px" }}
        fontWeight="700"
        textWidth={{ xs: "100%", md: "100%" }}
        textAlignment="center"
        marginTop={{ xs: "1rem", md: "12rem" }}
        padding={{ xs: "0rem 1rem", md: "0" }}
        highlightWordsList={["Trusted"]}
        highlightWordsFontWeight="700"
      />
      <TrustedBy maxWidth="70rem" />
      {/* Stats */}
      <Stats maxWidth="75rem" />
      {/* powered by  */}
      <PoweredBy maxWidth="75rem" />
      {/* section break text */}
      {/* <DisplayTextImage
        text="Our Users Love Us! Hear Feedback From Our Thriving Sakshm Community!"
        fontSize={{ xs: "1.5rem", md: "40px" }}
        fontWeight="600"
        padding={{ xs: "0 1rem", md: "4rem 0rem" }}
        textWidth={{ xs: "100%", md: "100%" }}
        textAlignment="center"
        highlightWordsList={["Sakshm"]}
        highlightWordsFontFamily="Samark !important"
      /> */}
      {/* Testimonials */}
      {/* <Testimonial
        reduceInto={3}
        showArrows={false}
        indicator={false}
        testimonialsData={data.testimonials}
        maxWidth="85rem"
        outerPadding={{
          xs: "2rem 1rem",
          sm: "2rem 1rem",
          md: "2rem 8rem 6rem 8rem",
        }}
      /> */}
      {/* Testimonials on mobile */}
      {/* <Testimonial
        reduceInto={1}
        testimonialsData={data.testimonials}
        showArrows={false}
        indicator={true}
        displayOn="mobile"
        outerPadding={{
          xs: "3rem",
        }}
      /> */}
      {/* section break text */}
      {/* <DisplayTextImage
        text="Sakshm.Ai Highlights"
        fontSize={{ xs: "1.5rem", md: "40px" }}
        fontWeight="400"
        fontFamily="Samark !important"
        textAlignment="center"
        textWidth={{ xs: "100%", md: "60%" }}
        marginTop={{ xs: "1rem", md: "2rem" }}
        marginBottom={{ xs: "1rem", md: "2rem" }}
        highlightWordsList={["Highlights"]}
      /> */}
      {/* Carousel for images  */}
      {/* <CarouselWrapper
        showArrows={true}
        indicator={true}
        showArrowPanelBottom={false}
        top="calc(100% - 4.5rem)"
        maxWidth="85rem"
        outerPadding={{
          xs: "2rem 0rem",
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
              padding: { xs: "0rem 0rem", md: "0rem 8rem" },
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
      </CarouselWrapper> */}
      {/* section break text */}
      <DisplayTextImage
        text="sakshm for colleges"
        fontSize={{ xs: "1.5rem", md: "40px" }}
        fontWeight="700"
        textAlignment="center"
        textWidth={{ xs: "100%", md: "60%" }}
        marginTop={{ xs: "1rem", md: "2rem" }}
        marginBottom={{ xs: "1rem", md: "2rem" }}
        highlightWordsList={["sakshm"]}
        highlightWordsFontFamily="Samark !important"
        highlightWordsColor={["#000", "#000"]}
      />
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
        maxWidth="85rem"
        outerPadding={{
          xs: "2rem 1rem",
          sm: "2rem 1rem",
          md: "0rem 6rem 2rem 6rem",
        }}
      />
    </React.Fragment>
  );
}
