import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Box from "@mui/material/Box";
import Slide from "@mui/material/Slide";
import { images } from "../../assets/index";
import {
  Backdrop,
  Button,
  CardMedia,
  FormControl,
  IconButton,
  InputLabel,
  Link,
  Modal,
  OutlinedInput,
} from "@mui/material";
import FeatureCard from "./Components/FeatureCard";
import DisplayTextImage from "./Components/DisplayTextImage";
import ImageCard from "./Components/ImageCard";
import Stats from "./Components/Stats";
import FounderSectionIllustration from "./Components/FounderSectionIllustration";
import { useSpring, animated } from "@react-spring/web";
import ClearIcon from "@mui/icons-material/Clear";
import { motion } from "framer-motion";
import Domain from "./Components/Domain";
import TestimonialCard from "./Components/TestimonialCard";
import data from "./data";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";

const topRowDomains = data.domains.slice(0, 4);
const bottomRowDomains = data.domains.slice(4, 7);

// react spring for modal animation
const Fade = React.forwardRef(function Fade(props, ref) {
  const {
    children,
    in: open,
    onClick,
    onEnter,
    onExited,
    ownerState,
    ...other
  } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter(null, true);
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null, true);
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {React.cloneElement(children, { onClick })}
    </animated.div>
  );
});

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
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default function HideAppBar(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  return (
    <React.Fragment>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar
          sx={{
            backgroundColor: "white",
            height: "64px",
            color: "black",
            padding: { xs: "0rem 0.5rem", md: "0rem 2rem" },
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
                width: "100px",
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
                Sign Up
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
      {/* Main hero section  */}
      <Box
        sx={{
          display: "flex",
          width: "100%",
          padding: { xs: "2.5rem", md: "3rem" },
          backgroundImage: `url(${images.backgroundLanding})`,
          marginBottom: { xs: "1rem", md: "2.5rem" },
        }}
      >
        {/* Left side */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "4rem",
            width: "100%",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              color: "black",
              fontSize: { xs: "2rem", md: "2.5rem" },
              fontWeight: "600",
            }}
          >
            Supercharge your
            <br />
            <Typography
              component="span"
              sx={{
                color: "#205EFF",
                fontSize: { xs: "2rem", md: "2.5rem" },
                fontWeight: "600",
              }}
            >
              {" career growth "}
            </Typography>
            with AI!
            <Typography
              sx={{
                fontSize: { xs: "1.5rem", md: "1.5rem" },
                marginTop: "1rem",
              }}
            >
              Use AI to redefine your career growth journey and become Industry
              ready for top careers & placements!
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "1rem", md: "1.5rem" },
                marginTop: "1rem",
                color: "#205EFF",
              }}
            >
              #SakshmAI #SakshmBharat
            </Typography>
          </Typography>
          <Button
            size="large"
            variant="contained"
            onClick={handleOpen}
            sx={{
              width: { xs: "100%", md: "fit-content" },
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
          <Modal
            aria-labelledby="spring-modal-title"
            aria-describedby="spring-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
              backdrop: {
                TransitionComponent: Fade,
              },
            }}
          >
            <Fade in={open}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: { xs: "90%", md: "100%" },
                  maxWidth: { xs: "90%", md: "900px" },
                  backgroundColor: isSubmitted ? "#088ECE" : "background.paper",
                  boxShadow: 24,
                  borderRadius: "10px",
                  padding: { xs: "2rem", md: "2rem 4rem" },
                }}
              >
                {!isSubmitted && (
                  <>
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
                                // fontWeight: "600",
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
                      {/* cross button */}
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "flex-end",
                        }}
                      >
                        <IconButton aria-label="clear" onClick={handleClose}>
                          <ClearIcon />
                        </IconButton>
                      </Box>

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

                        <FormControl variant="standard" size="small">
                          <OutlinedInput placeholder="Organization" />
                        </FormControl>

                        <FormControl variant="standard" size="small">
                          <OutlinedInput placeholder="Your Email" />
                        </FormControl>

                        <FormControl variant="standard" size="small">
                          <OutlinedInput placeholder="Mobile Number" />
                        </FormControl>

                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <InputLabel shrink htmlFor="message">
                            Message (Optional)
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
                          onClick={() => setIsSubmitted(true)}
                        >
                          Get Started
                        </Button>
                      </Box>
                    </Box>
                  </>
                )}
                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: { xs: "column-reverse", md: "row" },
                        width: "100%",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "2rem",
                        }}
                      >
                        <Typography
                          variant="h4"
                          sx={{
                            fontSize: { xs: "1.5rem", md: "2rem" },
                            color: "white",
                            textAlign: "center",
                          }}
                        >
                          Thank you for submitting your details. Our team will
                          get back to you shortly.
                        </Typography>
                        <Button
                          size="large"
                          fullWidth
                          variant="contained"
                          sx={{
                            backgroundColor: "white",
                            color: "#3366ff",
                            "&:hover": {
                              backgroundColor: "white",
                            },
                          }}
                          onClick={() => {
                            handleClose();
                            setTimeout(() => {
                              setIsSubmitted(false);
                            }, 1000);
                          }}
                        >
                          Close
                        </Button>
                      </Box>
                      <CardMedia
                        component="img"
                        sx={{
                          width: { xs: "100%", md: "50%" },
                          objectFit: "contain",
                        }}
                        image={images.thankYou}
                        alt="landing page image"
                      />
                    </Box>
                  </motion.div>
                )}
              </Box>
            </Fade>
          </Modal>
        </Box>
        {/* Right side , but not visible on mobile */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            justifyContent: "center",
            width: "100%",
          }}
        >
          <CardMedia
            component="img"
            sx={{
              width: "400px",
              objectFit: "contain",
            }}
            image={images.landingHeroRight}
            alt="landing page image"
          />
        </Box>
      </Box>

      {/* Features section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          padding: { xs: "2rem", md: "0rem 3rem" },
          marginTop: { xs: "1rem", md: "2.5rem" },
        }}
      >
        {/* Inner content  */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            backgroundImage: `url(${images.backgroundLanding})`,
            padding: { xs: "2rem", md: "6rem 2rem" },
            borderRadius: "20px",
          }}
        >
          {/* Center aligned heading */}
          <DisplayTextImage
            text="Leverage our unified AI-Powered career growth platform to catapult you to Success"
            fontSize={{ xs: "1.2rem", md: "30px" }}
            fontWeight="600"
            padding={{ xs: "1rem", md: "0rem" }}
            textWidth={{ xs: "100%", md: "60%" }}
            textAlignment="center"
            highlightWords={["AI-Powered", "Success"]}
          />

          {/* Grid Cards for features */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              gap: "2rem",
              rowGap: { xs: "2rem", md: "5rem" },
              marginTop: { xs: "2rem", md: "8rem" },
              padding: { xs: "0rem", md: "0rem 2rem" },
            }}
          >
            <FeatureCard
              title="360° Evaluation"
              desc="Comprehensively assess your technical & soft skills to build your unique skill map."
              img={images.featureCard1}
            />
            <FeatureCard
              title="AI-led Skilling"
              desc="Use our AI-instructor to get skilled in Tech, Product, Design, Marketing & Business Communication to jump ahead of the curve."
              img={images.featureCard2}
            />
            <FeatureCard
              title="Career Resources"
              desc="Access a wealth of resources, such as Profile building tools, Interview prep, Industry Mentorship and Insights to become placement ready."
              img={images.featureCard3}
            />
            <FeatureCard
              title="Placement Support"
              desc="Get placement connects in top companies and startups from our extensive partner network to kickstart your career"
              img={images.featureCard4}
            />
          </Box>
        </Box>
      </Box>

      {/* section break text */}
      <DisplayTextImage
        text="Get access to top programs across a wide range of domains"
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: { xs: "0rem", md: "0rem 8rem" },
          gap: "2rem",
        }}
      >
        {/* Top row with 4 cards */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            flexWrap: "wrap",
            justifyContent: "space-between",
            width: "100%",
            gap: "2rem",
          }}
        >
          {topRowDomains.map((domain, idx) => (
            <Domain
              key={idx}
              text={domain.text}
              image={domain.image}
              bgColor={domain.bgColor}
            />
          ))}
        </Box>
        {/* Bottom row with 3 centered cards */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "center",
            width: "100%",
            gap: "2rem",
          }}
        >
          {bottomRowDomains.map((domain, idx) => (
            <Domain
              key={idx}
              text={domain.text}
              image={domain.image}
              bgColor={domain.bgColor}
            />
          ))}
        </Box>
      </Box>

      {/* section break text */}
      <DisplayTextImage
        text="Meet Our Team of Industry Leaders & Domain Experts"
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
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          padding: { xs: "0rem", md: "0rem 10rem" },
          marginBottom: { xs: "1rem", md: "2.5rem" },
        }}
      >
        <ImageCard
          name="Apurv Mehra"
          image={images.apurv}
          about="IIITD, TWU, MSR"
        />
        <ImageCard
          name="Apurv Mehra"
          image={images.kashish}
          about="IITD, IAS, MSR"
        />
        <ImageCard
          name="Apurv Mehra"
          image={"https://avatar.iran.liara.run/public/boy"}
          about="IIITD, TWU, MSR"
        />
      </Box>

      {/* Founders section on mobile */}
      <Box
        sx={{
          display: { xs: "flex", md: "none" },
          flexDirection: "row",
          gap: "1rem",
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
          <ImageCard
            name="Apurv Mehra"
            image={images.apurv}
            about="IIITD, TWU, MSR"
          />
        </Box>
        <Box
          sx={{
            flex: "0 0 100%",
            scrollSnapAlign: "start",
          }}
        >
          <ImageCard
            name="Apurv Mehra"
            image={images.kashish}
            about="IITD, IAS, MSR"
          />
        </Box>
        <Box
          sx={{
            flex: "0 0 100%",
            scrollSnapAlign: "start",
          }}
        >
          <ImageCard
            name="Apurv Mehra"
            image={"https://avatar.iran.liara.run/public/boy"}
            about="IIITD, TWU, MSR"
          />
        </Box>
      </Box>

      {/* founders section illustrations */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          width: "100%",
          gap: { xs: "1rem", md: "2rem" },
          padding: { xs: "1rem", md: "0rem 10rem" },
          margin: { xs: "0rem 0rem", md: "4rem 0rem" },
        }}
      >
        <FounderSectionIllustration
          image={images.founderSectionIllustration1}
          text="Experience in mentoring, guideding,  and placing 10,000+ Candidates"
          highlightWords={["Experience"]}
        />
        <FounderSectionIllustration
          image={images.founderSectionIllustration2}
          text="Extensive Network of Top Companies, Startups, Academia & Govt."
          highlightWords={["Network"]}
        />
        <FounderSectionIllustration
          image={images.founderSectionIllustration3}
          text="Domain expertise in building cutting-edge AI/ML and LLM platforms"
          highlightWords={["expertise", "AI/ML", "LLM"]}
        />
      </Box>

      {/* section break text */}
      <DisplayTextImage
        text="Get a seamless, unified experience to power & track your career growth journey"
        fontSize={{ xs: "1.5rem", md: "2rem" }}
        fontWeight="600"
        padding={{ xs: "1rem", md: "0rem" }}
        textWidth={{ xs: "100%", md: "60%" }}
        textAlignment="center"
        marginTop={{ xs: "1rem", md: "4rem" }}
        marginBottom={{ xs: "1rem", md: "4rem" }}
        highlightWords={["career", "growth"]}
      />

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
        highlightWords={["Hiring", "Skilling", "&", "Partners"]}
      />

      {/* section break text */}
      <DisplayTextImage
        image={images.partners}
        padding={{ xs: "0rem 1rem", md: "0rem 4rem" }}
        marginTop={{ xs: "1rem", md: "2rem" }}
        marginBottom={{ xs: "1rem", md: "2rem" }}
      />

      {/* Stats section */}
      <Box
        sx={{
          width: "100%",
          padding: { xs: "0rem", md: "0rem 10rem" },
          margin: { xs: "2rem 0rem", md: "4rem 0rem" },
        }}
      >
        <Box
          sx={{
            gridTemplateColumns: { xs: "1fr 1fr", md: "1fr 1fr" },
            gap: "2rem",
            flexDirection: "row",
            justifyContent: "space-between",
            display: { xs: "grid", md: "flex" },
            border: "1px solid white",
            borderRadius: "10px",
            boxShadow: {
              xs: "none",
              md: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
            },
            padding: "2rem",
          }}
        >
          <Stats count="74" text="HIRING PARTNERS" />
          <Stats count="20" text="PLACEMENTS" />
          <Stats count="100" text="STUDENTS ENROLLED" />
          <Stats count="40" text="COLLEGE PARTNERS" />
        </Box>
      </Box>

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
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          padding: "4rem",
          width: "100%",
          backgroundColor: "#EFF6FF",
          gap: "2rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            position: "relative",
            overflow: "visible",
            gap: "2rem",
          }}
        >
          {/* double quote on top left */}
          <CardMedia
            component="img"
            sx={{
              position: "absolute",
              top: "-25px", // Adjust the value to move it upwards
              left: "-25px", // Adjust the value to move it leftwards
              width: "50px",
            }}
            image={images.doubleQuote}
            alt="testimonials"
          />
          {/* double quote on Bottom right */}
          <CardMedia
            component="img"
            sx={{
              position: "absolute",
              bottom: "-25px",
              right: "-25px",
              width: "50px",
              transform: "rotate(180deg)",
            }}
            image={images.doubleQuote}
            alt="testimonials"
          />
          {/* testimonial content Box */}
          {data.testimonials.map((testimonial, idx) => (
            <TestimonialCard
              key={idx}
              text={testimonial.text}
              image={testimonial.image}
              name={testimonial.name}
              about={testimonial.about}
              rating={testimonial.rating}
            />
          ))}
        </Box>
      </Box>

      {/* Testimonials on mobile */}
      <Box
        sx={{
          display: { xs: "flex", md: "none" },
          padding: "2rem",
          width: "100%",
          backgroundColor: "#EFF6FF",
          gap: "2rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            position: "relative",
            overflow: "visible",
            gap: "2rem",
            overflowX: "scroll",
            overflowY: "hidden",
            scrollSnapType: "x mandatory",
            scrollBehavior: "smooth",
          }}
        >
          {/* testimonial content Box */}
          {data.testimonials.map((testimonial, idx) => (
            <Box
              sx={{
                flex: "0 0 100%",
                scrollSnapAlign: "start",
              }}
            >
              <TestimonialCard
                key={idx}
                text={testimonial.text}
                image={testimonial.image}
                name={testimonial.name}
                about={testimonial.about}
                rating={testimonial.rating}
              />
            </Box>
          ))}
        </Box>
      </Box>

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
      <CardMedia
        component="img"
        sx={{
          width: "80%",
          objectFit: "contain",
          margin: "0 0 4rem 0",
        }}
        image={images.newsBg}
        alt="news carousel"
      />

      {/* Get started  */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          backgroundImage: `url(${images.backgroundLanding})`,
          padding: { xs: "2rem", md: "4rem" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: { xs: "100%", md: "100%" },
            maxWidth: { xs: "100%", md: "900px" },
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

              <FormControl variant="standard" size="small">
                <OutlinedInput placeholder="Organization" />
              </FormControl>

              <FormControl variant="standard" size="small">
                <OutlinedInput placeholder="Your Email" />
              </FormControl>

              <FormControl variant="standard" size="small">
                <OutlinedInput placeholder="Mobile Number" />
              </FormControl>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <InputLabel shrink htmlFor="message">
                  Message (Optional)
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

      {/* Footer */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          padding: { xs: "2rem", md: "2rem 10rem" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <CardMedia
            component="img"
            sx={{
              width: "100px",
              objectFit: "contain",
            }}
            image={images.sakshamLogo}
            alt="logo"
          />
          <Box>
            <IconButton color="primary" aria-label="LinkedIn">
              <LinkedInIcon />
            </IconButton>
            <IconButton color="info" aria-label="Twitter">
              <TwitterIcon />
            </IconButton>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            gap: "1rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              gap: { xs: "1rem", md: "2rem" },
              fontSize: { xs: "0.8rem", md: "1rem" },
              fontWeight: "600",
              width: { xs: "100%", md: "max-content" },
            }}
          >
            <Link href="#"> Privacy policy</Link>
            <Link href="#"> Terms of use</Link>
            <Link href="#"> Grievance policy</Link>
          </Box>
          <Typography
            sx={{
              color: "#142349",
              width: "max-content",
            }}
          >
            Copyright © 2024 Blendnet Tech Solutions Pvt Ltd
          </Typography>
        </Box>
      </Box>
    </React.Fragment>
  );
}
