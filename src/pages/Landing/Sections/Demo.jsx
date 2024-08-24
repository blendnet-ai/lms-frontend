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
          flexDirection: "row",
          borderRadius: "20px",
          maxWidth: maxWidth,
          margin: "auto",
          width: "100%",
          gap: "4rem",
        }}
      >
        {/* left  */}
        <Box sx={{
          width: "60%",
          display: "flex",
          backgroundColor: "#D9D9D9",
          height: "500px",
          borderRadius: "20px",
        }}>

        </Box>
        {/* right  */}
        <Box sx={{
          width: "40%",
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          padding: "2rem",
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
              padding: "1rem 1rem 1rem 3rem",
            }}>
              <CardMedia
                key={idx}
                component="img"
                sx={{
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
                fontSize: "20px",
                fontWeight: "bold",
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
