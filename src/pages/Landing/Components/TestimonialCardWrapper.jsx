import React from "react";
import TestimonialCards from "./TestimonialCards";
import CarouselWrapper from "./CarouselWrapper";
import { Box, CardMedia } from "@mui/material";
import { images } from "../../../assets/index";

const TestimonialCardWrapper = ({
  testimonialsData,
  reduceInto,
  displayOn,
  maxWidth,
  outerPadding,
  showArrows,
  indicator,
}) => {
  // Slice the testimonials into groups of reduceInto
  const slicedTestimonials = testimonialsData.reduce(
    (accumulator, current, index) => {
      if (index % reduceInto === 0) {
        accumulator.push([current]);
      } else {
        accumulator[accumulator.length - 1].push(current);
      }
      return accumulator;
    },
    []
  );
  return (
    <Box
      sx={{
        display:
          displayOn === "mobile"
            ? { xs: "flex", md: "none" }
            : { xs: "none", md: "flex" },
        padding: outerPadding,
        width: "100%",
        gap: "2rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "row",
          justifyContent: "center",
          position: "relative",
          maxWidth: maxWidth,
          margin: "auto",
          overflow: { xs: "hidden", md: "visible" },
        }}
      >
        {/* double quote on top left */}
        <CardMedia
          component="img"
          sx={{
            position: "absolute",
            top: "-50px",
            left: "-50px",
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
            bottom: "-50px",
            right: " -50px",
            width: "50px",
            transform: "rotate(180deg)",
          }}
          image={images.doubleQuote}
          alt="testimonials"
        />
        <CarouselWrapper
          showArrowPanelBottom={false}
          top="100%"
          showArrows={showArrows}
          indicator={indicator}
        >
          {slicedTestimonials.map((group, index) => (
            <TestimonialCards key={index} count={reduceInto} data={group} />
          ))}
        </CarouselWrapper>
      </Box>
    </Box>
  );
};

export default TestimonialCardWrapper;
