import React from "react";
import { Box, CardMedia, Typography } from "@mui/material";
import "../landing.css";
import { icons } from "../../../assets";
const DisplayTextImage = ({
  text,
  marginTop = 0,
  marginBottom = 0,
  highlightWords = [],
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
}) => {
  const newText = text && text.split(" ");

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
        backgroundImage: bgImage && `url(${bgImage})`,
      }}
    >
      {text && (
        <Typography
          variant="h2"
          sx={{
            fontSize: fontSize,
            color: textColor,
            fontWeight: fontWeight,
            letterSpacing: "0.5px",
            textAlign: textAlignment,
            width: textWidth,
            padding: padding,
            fontFamily: fontFamily,
          }}
        >
          {newText.map((word, idx) => {
            const isHighlighted = highlightWords.includes(word);
            return (
              <React.Fragment key={idx}>
                {isHighlighted ? (
                  <Typography
                    id="highlighted-text"
                    component="span"
                    sx={{
                      color: highlightWordsColor,
                      fontSize: fontSize,
                      fontWeight: fontWeight,
                      fontFamily: highlightWordsFontFamily,
                    }}
                  >
                    {` ${word} `}
                  </Typography>
                ) : (
                  ` ${word} `
                )}
              </React.Fragment>
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
