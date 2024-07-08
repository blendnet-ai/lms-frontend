import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Box from "@mui/material/Box";
import Slide from "@mui/material/Slide";
import { images } from "../../assets/index";
import {
  Button,
  CardMedia,
  Drawer,
  IconButton,
  List,
  ListItem,
} from "@mui/material";
import DisplayTextImage from "./Components/DisplayTextImage";
import data from "./data";
import { useNavigate } from "react-router-dom";
import { Menu as MenuIcon } from "@mui/icons-material";
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
function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

export default function Landing(props) {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar
          sx={{
            backgroundColor: "white",
            height: "64px",
            color: "black",
            boxShadow: "none",
            padding: {
              xs: "0rem 2rem",
              sm: "0rem 1rem",
              md: "0rem 8rem",
            },
          }}
        >
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0 !important",
              width: "100%",
              maxWidth: "75rem",
              margin: "auto",
            }}
          >
            {/* Logo  */}
            <CardMedia
              component="img"
              sx={{
                width: "120px",
                objectFit: "contain",
              }}
              image={images.sakshamLogo}
              alt="logo"
            />
            {/* Button groups, only on desktop*/}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                gap: "1rem",
              }}
            >
              {/* <Button
                variant="outlined"
                onClick={() => navigate("/login")}
                sx={{
                  backgroundColor: "white",
                  color: "#3366FF",
                  // borderRadius: "20px",
                  borderColor: "#3366FF",
                  "&:hover": {
                    backgroundColor: "white",
                    borderColor: "#3366FF",
                    },
                    }}
                    >
                    Login
                    </Button> */}
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#2059EE",
                  color: "white",
                  borderRadius: "10px",
                  boxShadow: "1px 10px 12.7px 0px #3177E13D",
                  "&:hover": {
                    backgroundColor: "#2059EE",
                  },
                }}
              >
                Get Started
              </Button>
            </Box>

            {/* Mobile Menu */}
            <Box
              sx={{
                display: { xs: "block", md: "none" },
                ml: "auto",
              }}
            >
              <IconButton color="black" onClick={toggleDrawer}>
                <MenuIcon />
              </IconButton>
            </Box>

            {/* Mobile Drawer */}
            <Drawer anchor="bottom" open={drawerOpen} onClose={toggleDrawer}>
              <List>
                <ListItem>
                  <Button
                    variant="text"
                    sx={{ width: "100%" }}
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </Button>
                </ListItem>
                <ListItem>
                  <Button variant="text" sx={{ width: "100%" }}>
                    Sign Up
                  </Button>
                </ListItem>
              </List>
            </Drawer>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />

      {/* Main hero section  */}
      <Hero
        maxWidth="75rem"
        outerPadding={{
          xs: "2rem 2rem",
          sm: "2rem 1rem",
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
        highlightWords={["Industry-Led", "Courses"]}
        padding={{ xs: "0rem 1rem", md: "" }}
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
        highlightWords={["Proven", "Expertise"]}
        padding={{ xs: "0rem 1rem", md: "0" }}
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
        highlightWords={["Career", "Journey"]}
        padding={{ xs: "0rem 1rem", md: "0" }}
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
        highlightWords={["Partners"]}
        padding={{ xs: "0rem 1rem", md: "0" }}
      />
      {/* Ticker  */}
      <Ticker partnersImage={images.partners} />
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
        bgImage={images.backgroundLanding}
        fontSize={{ xs: "1.5rem", md: "40px" }}
        fontWeight="600"
        padding={{ xs: "0 1rem", md: "4rem 0rem" }}
        textWidth={{ xs: "100%", md: "800px" }}
        textAlignment="center"
        marginTop={{ xs: "1rem", md: "4rem" }}
        highlightWords={["Sakshm.ai"]}
        highlightWordsFontFamily="Samark !important"
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
          xs: "2rem",
        }}
      />
      {/* section break text */}
      <DisplayTextImage
        text="Sakshm.Ai Highlights"
        fontSize={{ xs: "1.5rem", md: "40px" }}
        fontWeight="600"
        fontFamily="Samark !important"
        textAlignment="center"
        textWidth={{ xs: "100%", md: "60%" }}
        marginTop={{ xs: "1rem", md: "4rem" }}
        marginBottom={{ xs: "1rem", md: "2rem" }}
        highlightWords={["Highlights"]}
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
      <LandingFooter />
    </React.Fragment>
  );
}
