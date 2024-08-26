import { Box, CardMedia, Typography } from '@mui/material'
import React from 'react'
import data from '../data'

export default function Demo({
  maxWidth,
  outerPadding,
}) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        padding: outerPadding,
      }}
    >
      {/* Inner content  */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          borderRadius: "20px",
          maxWidth: maxWidth,
          margin: "auto",
          width: "100%",
          gap: "4rem",
        }}
      >
        {/* left  */}
        <Box sx={{
          width: { xs: "100%", md: "57%" },
          display: "flex",
          backgroundColor: "#D9D9D9",
          height: "500px",
          borderRadius: "20px",
        }}>
          <iframe
            width={"100%"}
            height={"100%"}
            src="https://www.youtube.com/embed/icF2V0uK5Ho?list=PLCgaF759sfrf--TYtDJqDNai69tzEszOJ"
            title="Project ComuniQa | AI Powered Communication Coach"
            frameBorder={0}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen={true}
          />

        </Box>
        {/* right  */}
        <Box sx={{
          width: { xs: "100%", md: "43%" },
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          padding: { xs: "0rem", md: "2rem" },
          justifyContent: "space-evenly",
        }}>
          {data.demoData.map((item, idx) => (
            <Box sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              position: "relative",
              border: `2px solid ${item.borderColor}`,
              boxShadow: "0px 0px 19.9px 1px #153A731C",
              borderRadius: "5px",
              padding: { xs: "1rem", md: "1rem 1rem 1rem 4.5rem" },
            }}>
              <CardMedia
                key={idx}
                component="img"
                sx={{
                  display: { xs: "none", md: "block" },
                  objectFit: "contain",
                  width: "100px",
                  height: "auto",
                  position: "absolute",
                  left: "-60px",
                  top: "0",
                }}
                image={item.image}
                alt={item.title} />
              <Typography sx={{
                fontSize: { xs: "16px", md: "20px" },
                fontWeight: "600",
                color: "#1C1C1C",
                textAlign: "left",
              }}>{item.title}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  )
}
