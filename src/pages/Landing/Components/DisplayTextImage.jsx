import React from "react";
import { Box, CardMedia, Typography } from "@mui/material";
import "./landingComponents.css";

const DisplayTextImage = ({
  text,
  marginTop = 0,
  marginBottom = 0,
  highlightWords = [],
  fontSize = "1rem",
  fontWeight,
  textWidth = "100%",
  padding = "0rem",
  image,
  bgImage,
  textAlignment,
  highlightWordsColor = "#205EFF",
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
        padding: padding,
        backgroundImage: bgImage && `url(${bgImage})`,
      }}
    >
      {text && (
        <Typography
          variant="h2"
          sx={{
            fontSize: fontSize,
            width: textWidth,
            color: "#142349",
            fontWeight: fontWeight,
            letterSpacing: "0.5px",
            textAlign: textAlignment,
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
