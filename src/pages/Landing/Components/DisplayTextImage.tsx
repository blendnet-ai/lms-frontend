import React from "react";
import { Box, CardMedia, Typography } from "@mui/material";
import Typewriter from "typewriter-effect";

type TextAlign = "left" | "center" | "right" | "justify";

interface DisplayTextImageProps {
  text: string;
  marginTop?: string | {};
  marginBottom?: string | {};
  highlightWordsList?: string[];
  gradientWordsList?: string[];
  gradientWordsColor?: string[];
  highlightWordsButNotUnderlinedList?: string[];
  fontSize?: string | {};
  fontWeight?: string;
  fontFamily?: string;
  highlightWordsFontFamily?: string;
  highlightWordsButNotUnderlinedFontFamily?: string;
  placeNewLineAfterWord?: string;
  textWidth?: string | {};
  image?: string;
  bgImage?: string;
  textAlignment?: string | {};
  padding?: string | {};
  textColor?: string;
  highlightWordsColor?: string[];
  wordsToChangeFontFamily?: { word: string; fontFamily: string }[];
  underlineImageWords?: string[];
  underlineImageUrl?: string;
  underlineHeight?: string;
  transform?: string | {};
  underlineWidth?: string | {};
  underlineBottom?: string | {};
  highlightWordsFontWeight?: string;
  width?: string | {};
  backgroundSize?: string | {};
  typeWriterEffectWords?: string[];
}

const DisplayTextImage: React.FC<DisplayTextImageProps> = React.memo(
  ({
    text,
    marginTop = 0,
    marginBottom = 0,
    highlightWordsList = [],
    gradientWordsList = [],
    gradientWordsColor = ["#063FD4", "#063FD4"],
    highlightWordsButNotUnderlinedList = [],
    fontSize = "1rem",
    fontWeight,
    fontFamily = "Open Sans",
    highlightWordsFontFamily = "Open Sans",
    highlightWordsButNotUnderlinedFontFamily = "Open Sans",
    placeNewLineAfterWord = "none",
    textWidth = "100%",
    image,
    bgImage,
    textAlignment = "left",
    padding = "0",
    textColor = "#142349",
    highlightWordsColor = ["#063FD4", "#063FD4"],
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
    const bgImageStyle = bgImage ? { backgroundImage: `url(${bgImage})` } : {};

    const renderWord = (word: string, idx: number) => {
      const isHighlighted = highlightWordsList.includes(word);
      const isGradient = gradientWordsList.includes(word);
      const isHighlightWithoutUnderline =
        highlightWordsButNotUnderlinedList.includes(word);
      const wordToChange = wordsToChangeFontFamily.find((w) => w.word === word);
      const showUnderlineImage = underlineImageWords.includes(word);

      return (
        <React.Fragment key={idx}>
          <Box
            component="span"
            sx={{
              letterSpacing: "normal",
              display: "inline-block",
              position: "relative",
              fontSize,
              fontWeight:
                isHighlighted || isHighlightWithoutUnderline
                  ? highlightWordsFontWeight
                  : fontWeight,
              fontFamily: isHighlighted
                ? highlightWordsFontFamily
                : isHighlightWithoutUnderline
                ? highlightWordsButNotUnderlinedFontFamily
                : wordToChange
                ? wordToChange.fontFamily
                : fontFamily,
              color: textColor,
              marginRight: "6px",
              background: isGradient
                ? `linear-gradient(270deg, ${gradientWordsColor[0]} 43.92%, ${gradientWordsColor[1]} 58.28%)`
                : isHighlighted
                ? `linear-gradient(270deg, ${highlightWordsColor[0]} 43.92%, ${highlightWordsColor[1]} 58.28%)`
                : "none",
              WebkitBackgroundClip:
                isGradient || isHighlighted ? "text" : "none",
              WebkitTextFillColor:
                isGradient || isHighlighted ? "transparent" : "none",
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
                  transform,
                  width: underlineWidth,
                  height: underlineHeight,
                  backgroundImage: `url(${underlineImageUrl})`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center bottom",
                  backgroundSize,
                }}
              />
            )}
          </Box>
          {word === placeNewLineAfterWord && <br />}
        </React.Fragment>
      );
    };

    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width,
          marginBottom,
          marginTop,
          ...bgImageStyle,
        }}
      >
        {text && (
          <Typography
            variant="h2"
            sx={{
              fontSize,
              color: textColor,
              fontWeight,
              textAlign: textAlignment as TextAlign,
              width: textWidth,
              padding,
              fontFamily,
              // whiteSpace: "nowrap",
              textWrap: "balance",
              lineHeight: "1.4",
            }}
          >
            {text.split(" ").map(renderWord)}
            {typeWriterEffectWords.length > 0 && (
              <Box
                component="span"
                sx={{ display: "inline-block", color: "#2059EE" }}
              >
                <Typewriter
                  options={{
                    strings: typeWriterEffectWords,
                    autoStart: true,
                    loop: true,
                    delay: 100,
                  }}
                />
              </Box>
            )}
          </Typography>
        )}
        {image && (
          <CardMedia
            component="img"
            sx={{ width: "100%", height: "auto" }}
            image={image}
            alt="landing page image"
          />
        )}
      </Box>
    );
  }
);

export default DisplayTextImage;
