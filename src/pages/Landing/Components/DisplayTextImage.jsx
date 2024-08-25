import React from "react";
import { Box, CardMedia, Typography } from "@mui/material";
import "../landing.css";
import Typewriter from "typewriter-effect";

const DisplayTextImage = ({
  text,
  marginTop = 0,
  marginBottom = 0,
  highlightWordsList = [],
  highlightWordsButNotUnderlinedList = [],
  fontSize = "1rem",
  fontWeight,
  fontFamily = "Open Sans",
  highlightWordsFontFamily = "Open Sans",
  highlightWordsButNotUnderlinedFontFamily = "Open Sans",
  placeNewLineAfterWord = "none", // New prop
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
  width = "100%",
  backgroundSize = "contain",
  typeWriterEffectWords = [],
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: width,
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
            whiteSpace: "pre-wrap", // Ensure that the new lines are respected
            lineHeight: "1.5",
          }}
        >
          {text.split(" ").map((word, idx) => {
            const isHighlighted = highlightWordsList.includes(word);
            const isHighlightWithoutUnderline = highlightWordsButNotUnderlinedList.includes(word);
            const wordToChange = wordsToChangeFontFamily.find(
              (w) => w.word === word
            );
            const showUnderlineImage = underlineImageWords.includes(word);

            return (
              <React.Fragment key={idx}>
                <Box
                  component="span"
                  sx={{
                    display: "inline-block",
                    position: "relative",
                    fontSize: fontSize,
                    fontWeight:
                      isHighlighted || isHighlightWithoutUnderline
                        ? highlightWordsFontWeight
                        : fontWeight,
                    fontFamily:
                      isHighlighted
                        ? highlightWordsFontFamily
                        : isHighlightWithoutUnderline
                          ? highlightWordsButNotUnderlinedFontFamily
                          : wordToChange
                            ? wordToChange.fontFamily
                            : fontFamily,
                    color: isHighlighted || isHighlightWithoutUnderline
                      ? highlightWordsColor
                      : textColor,
                    marginRight: "6px",
                  }}
                >
                  {word}
                  {showUnderlineImage && !isHighlightWithoutUnderline && (
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
                        backgroundSize: backgroundSize,
                      }}
                    />
                  )}
                </Box>
                {word === placeNewLineAfterWord && <br />}
              </React.Fragment>
            );
          })}
        </Typography>
      )}
      {/* {typeWriterEffectWords.length > 0 && (
        <Typography sx={{ fontSize: "1.5rem", color: "#142349" }} component={"span"}>
          <Typewriter
            options={{
              strings: typeWriterEffectWords,
              autoStart: true,
              loop: true,
            }}
          />
        </Typography>
      )} */}
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
