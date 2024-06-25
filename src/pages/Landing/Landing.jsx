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
            padding: { xs: "0rem 0.5rem", md: "0rem 4rem" },
            boxShadow: "none",
          }}
        >
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
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
              <Button
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
              </Button>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#3366ff",
                  color: "white",
                  // borderRadius: "20px",
                  "&:hover": {
                    backgroundColor: "#3366ff",
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
      <Hero />
      {/* Features section */}
      <Features />
      {/* section break text */}
      <DisplayTextImage
        text="Get access to top programs across a wide range of domains."
        fontSize={{ xs: "1.5rem", md: "2rem" }}
        fontWeight="600"
        padding={{ xs: "1rem", md: "0rem" }}
        textWidth={{ xs: "100%", md: "60%" }}
        textAlignment="center"
        marginTop={{ xs: "1rem", md: "4rem" }}
        marginBottom={{ xs: "1rem", md: "4rem" }}
        highlightWords={["domains"]}
      />
      {/* Domains section */}
      <Domains />
      {/* section break text */}
      <DisplayTextImage
        text="Meet Our Founding Team of Industry Leaders & Domain Experts."
        fontSize={{ xs: "1.5rem", md: "2rem" }}
        fontWeight="600"
        padding={{ xs: "1rem", md: "0rem" }}
        textWidth={{ xs: "100%", md: "60%" }}
        textAlignment="center"
        marginTop={{ xs: "1rem", md: "4rem" }}
        marginBottom={{ xs: "1rem", md: "4rem" }}
        highlightWords={["Domain", "Experts"]}
      />
      {/* Founders section */}
      <FounderSection />
      {/* section break text */}
      <DisplayTextImage
        text="Enjoy a seamless, Gamified experience to Fast Forward your career journey"
        fontSize={{ xs: "1.5rem", md: "2rem" }}
        fontWeight="600"
        padding={{ xs: "1rem", md: "0rem" }}
        textWidth={{ xs: "100%", md: "60%" }}
        textAlignment="center"
        marginTop={{ xs: "1rem", md: "4rem" }}
        marginBottom={{ xs: "1rem", md: "4rem" }}
        highlightWords={["career", "growth"]}
      />
      {/* Onboarding to Placement */}
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          gap: "1rem",
          width: "100%",
          padding: { xs: "0rem", md: "0rem 8rem" },
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
      {/* section break text */}
      <DisplayTextImage
        text="Meet our Illustrious Hiring & Skilling Partners"
        fontSize={{ xs: "1.5rem", md: "2rem" }}
        fontWeight="600"
        padding={{ xs: "1rem", md: "0rem" }}
        textWidth={{ xs: "100%", md: "60%" }}
        textAlignment="center"
        marginTop={{ xs: "1rem", md: "4rem" }}
        marginBottom={{ xs: "1rem", md: "4rem" }}
        highlightWords={["Partners"]}
      />
      {/* section break text */}
      <DisplayTextImage
        image={images.partners}
        padding={{ xs: "0rem 1rem", md: "0rem 8rem" }}
        marginTop={{ xs: "1rem", md: "2rem" }}
        marginBottom={{ xs: "1rem", md: "2rem" }}
      />
      {/* Stats section */}
      <StatSection />
      {/* section break text */}
      <DisplayTextImage
        text="Success Stories from Sakshm Students"
        bgImage={images.backgroundLanding}
        fontSize={{ xs: "1.5rem", md: "2rem" }}
        fontWeight="600"
        padding={{ xs: "1rem", md: "4rem 4rem 0rem 4rem" }}
        textWidth={{ xs: "100%", md: "60%" }}
        textAlignment="center"
        marginTop={{ xs: "1rem", md: "4rem" }}
        highlightWords={["Students"]}
      />
      {/* Testimonials */}
      <Testimonial reduceInto={3} testimonialsData={data.testimonials} />
      {/* Testimonials on mobile */}
      <Testimonial
        reduceInto={1}
        testimonialsData={data.testimonials}
        displayOn="mobile"
      />

      {/* section break text */}
      <DisplayTextImage
        text="Sakshm.Ai In the News"
        fontSize={{ xs: "1.5rem", md: "2rem" }}
        fontWeight="600"
        padding={{ xs: "1rem", md: "0rem" }}
        textAlignment="center"
        textWidth={{ xs: "100%", md: "60%" }}
        marginTop={{ xs: "1rem", md: "4rem" }}
        marginBottom={{ xs: "1rem", md: "4rem" }}
        highlightWords={["News"]}
      />
      {/* Carousel for images  */}
      <CarouselWrapper showArrowPanelBottom={false} top="calc(100% - 2.5rem)">
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
      <GetStarted />
      {/* Footer */}
      <LandingFooter />
    </React.Fragment>
  );
}
