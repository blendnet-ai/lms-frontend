import React from "react";
import { Box, CardMedia, Typography } from "@mui/material";
import "../landing.css";

const DisplayTextImage = ({
  text,
  marginTop = 0,
  marginBottom = 0,
  highlightWordsList = [],
  fontSize = "1rem",
  fontWeight,
  fontFamily = "Open Sans",
  highlightWordsFontFamily = "Open Sans",
  textWidth = "100%",
  image,
  bgImage,
  textAlignment,
  padding = "0",
  textColor = "#142349",
  highlightWordsColor = "#2059EE",
  wordsToChangeFontFamily = [],
  underlineImageWords = [],
  underlineImageUrl = "",
  underlineHeight = "15px",
  transform = "translateX(-50%)",
  underlineWidth = "100%",
  underlineBottom = "-5px",
  highlightWordsFontWeight = "600",
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        marginBottom: marginBottom,
        marginTop: marginTop,
        backgroundImage: { xs: "none", md: bgImage && `url(${bgImage})` },
      }}
    >
      {text && (
        <Typography
          variant="h2"
          sx={{
            fontSize: fontSize,
            color: textColor,
            fontWeight: fontWeight,
            letterSpacing: "1px",
            textAlign: textAlignment,
            width: textWidth,
            padding: padding,
            fontFamily: fontFamily,
            whiteSpace: "",
            lineHeight: "1.5",
          }}
        >
          {text.split(" ").map((word, idx) => {
            const isHighlighted = highlightWordsList.includes(word);
            const wordToChange = wordsToChangeFontFamily.find(
              (w) => w.word === word
            );
            const showUnderlineImage = underlineImageWords.includes(word);

            return (
              <Box
                key={idx}
                component="span"
                sx={{
                  display: "inline-block",
                  position: "relative",
                  fontSize: fontSize,
                  fontWeight: isHighlighted
                    ? highlightWordsFontWeight
                    : fontWeight,
                  fontFamily: isHighlighted
                    ? highlightWordsFontFamily
                    : wordToChange
                    ? wordToChange.fontFamily
                    : fontFamily,
                  color: isHighlighted ? highlightWordsColor : textColor,
                  marginRight: "6px",
                }}
              >
                {word}
                {showUnderlineImage && (
                  <Box
                    component="span"
                    className="underline-image"
                    sx={{
                      position: "absolute",
                      bottom: underlineBottom,
                      left: "50%",
                      transform: transform,
                      width: underlineWidth,
                      height: underlineHeight,
                      backgroundImage: `url(${underlineImageUrl})`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center bottom",
                      backgroundSize: "contain",
                    }}
                  />
                )}
              </Box>
            );
          })}
        </Typography>
      )}
      {image && (
        <CardMedia
          component="img"
          sx={{
            width: "100%",
            height: "auto",
          }}
          image={image}
          alt="landing page image"
        />
      )}
    </Box>
  );
};

export default DisplayTextImage;
