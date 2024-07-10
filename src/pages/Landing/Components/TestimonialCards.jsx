import { Box, CardMedia, Rating, Typography } from "@mui/material";

const TestimonialCards = ({ data, count }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        gap: "2rem",
        width: "100%",
        padding: "1rem",
        borderRadius: "10px",
      }}
    >
      {/* card */}
      {data.slice(0, count).map((item, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1rem",
            padding: "2rem",
            borderRadius: "10px",
            backgroundColor: "white",
            boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
            textAlign: "center",
          }}
        >
          {/* user image  */}
          {/* <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#dff6fe",
              borderRadius: "10px",
              width: "150px",
              height: "150px",
            }}
          >
            <CardMedia
              component="img"
              sx={{
                width: "calc(100% - 20px)",
                height: "calc(100% - 20px)",
                objectFit: "contain",
              }}
              image={item.image}
              alt="testimonials"
            />
          </Box> */}
          {/* rating  */}
          <Rating name="read-only" value={item.rating} readOnly />
          <Typography
            variant="h6"
            sx={{
              fontSize: "1rem",
              color: "#142349",
            }}
          >
            {item.text}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              alignItems: "flex-end",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontSize: "1rem",
                color: "#3366ff",
              }}
            >
              {item.name}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontSize: "1rem",
                color: "lightgray",
              }}
            >
              {item.about}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default TestimonialCards;
