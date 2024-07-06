import React, { useState } from "react";
import { Box, IconButton } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Make sure to import the carousel styles
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

const CarouselWrapper = ({
  children,
  showArrowPanelBottom = true,
  top,
  showArrows = true,
  indicator = true,
  maxWidth = "100%",
  outerPadding = "0",
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const next = () => setCurrentSlide((prev) => prev + 1);
  const prev = () => setCurrentSlide((prev) => prev - 1);
  const updateCurrentSlide = (index) => setCurrentSlide(index);
  const customIndicator = (onClickHandler, isSelected, index, label) => {
    if (isSelected) {
      return (
        <li
          style={{
            background: "#2059ee",
            width: 100,
            height: 10,
            display: "inline-block",
            margin: "0 8px",
            borderRadius: "10px",
          }}
          aria-label={`Selected: ${label} ${index + 1}`}
          title={`Selected: ${label} ${index + 1}`}
        />
      );
    }
    return (
      <li
        style={{
          background: "#badefe",
          width: 10,
          height: 10,
          display: "inline-block",
          margin: "0 8px",
          borderRadius: "50%",
        }}
        aria-label={`${label} ${index + 1}`}
        title={`${label} ${index + 1}`}
        onClick={onClickHandler}
      />
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        position: "relative",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        padding: outerPadding,
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: maxWidth,
          margin: "auto",
        }}
      >
        <Carousel
          autoPlay={true}
          showStatus={false}
          selectedItem={currentSlide}
          onChange={updateCurrentSlide}
          showArrows={false}
          renderIndicator={indicator && customIndicator}
          infiniteLoop={true}
          showThumbs={showArrowPanelBottom}
        >
          {children}
        </Carousel>
      </Box>
      {showArrows && (
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            position: "absolute",
            top: top,
            width: "30%",
            justifyContent: "space-between",
            zIndex: 1000,
          }}
        >
          <IconButton onClick={prev}>
            <ArrowLeftIcon
              sx={{
                color: "black",
              }}
            />
          </IconButton>
          <IconButton onClick={next}>
            <ArrowRightIcon
              sx={{
                color: "black",
              }}
            />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};

export default CarouselWrapper;
