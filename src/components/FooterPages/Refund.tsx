import { Box, Typography } from "@mui/material";
import Navbar from "../../pages/Landing/Components/Navbar";
import { Fragment } from "react/jsx-runtime";
import LandingFooter from "../../pages/Landing/Sections/LandingFooter";

export default function Refund() {
  return (
    <Fragment>
      <Navbar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "75rem",
          padding: {
            xs: "2rem 1rem",
            sm: "2rem 1rem",
            md: "2rem 8rem",
          },
        }}
      >
        <Typography
          sx={{
            fontSize: "30px",
            marginBottom: "20px",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          Refund and Cancellation policy
        </Typography>
        <Typography
          component={"ol"}
          sx={{
            fontSize: "20px",
            marginBottom: "20px",
            textAlign: "start",
            fontWeight: "bold",
          }}
        >
          <Typography
            component={"li"}
            sx={{
              fontSize: "24px",
              marginBottom: "20px",
              textAlign: "start",
              fontWeight: "semi-bold",
            }}
          >
            Cancellations will only be considered if the request is made 7 days
            of placing the order. However, cancellation requests may not be
            entertained if the orders have been communicated to such sellers /
            merchant(s) listed on the Platform and they have initiated the
            process of shipping them, or the product is out for delivery. In
            such an event, you may choose to reject the product at the doorstep.
          </Typography>

          <Typography
            component={"li"}
            sx={{
              fontSize: "24px",
              marginBottom: "20px",
              textAlign: "start",
              fontWeight: "semi-bold",
            }}
          >
            BLENDNET TECH SOLUTIONS PVT LTD does not accept cancellation
            requests for perishable items like flowers, eatables, etc. However,
            the refund / replacement can be made if the user establishes that
            the quality of the product delivered is not good.
          </Typography>

          <Typography
            component={"li"}
            sx={{
              fontSize: "24px",
              marginBottom: "20px",
              textAlign: "start",
              fontWeight: "semi-bold",
            }}
          >
            In case of receipt of damaged or defective items, please report to
            our customer service team. The request would be entertained once the
            seller/ merchant listed on the Platform, has checked and determined
            the same at its own end. This should be reported within 7 days of
            receipt of products.
          </Typography>

          <Typography
            component={"li"}
            sx={{
              fontSize: "24px",
              marginBottom: "20px",
              textAlign: "start",
              fontWeight: "semi-bold",
            }}
          >
            In case you feel that the product received is not as shown on the
            site or as per your expectations, you must bring it to the notice of
            our customer service within 7 days of receiving the product. The
            customer service team after looking into your complaint will take an
            appropriate decision.
          </Typography>

          <Typography
            component={"li"}
            sx={{
              fontSize: "24px",
              marginBottom: "20px",
              textAlign: "start",
              fontWeight: "semi-bold",
            }}
          >
            In case of complaints regarding the products that come with a
            warranty from the manufacturers, please refer the issue to them.
          </Typography>

          <Typography
            component={"li"}
            sx={{
              fontSize: "24px",
              marginBottom: "20px",
              textAlign: "start",
              fontWeight: "semi-bold",
            }}
          >
            In case of any refunds approved by BLENDNET TECH SOLUTIONS PVT LTD,
            it will take 14 days for the refund to be processed to you.
          </Typography>
        </Typography>

        {/* Footer  */}
        <LandingFooter
          maxWidth="75rem"
          outerPadding={{
            xs: "2rem 1rem",
            sm: "2rem 1rem",
            md: "2rem 0rem",
          }}
        />
      </Box>
    </Fragment>
  );
}
