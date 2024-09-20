import {
  Backdrop,
  Box,
  Button,
  CardMedia,
  Fade,
  Modal,
  Typography,
} from "@mui/material";
import { images } from "../../assets";
import Onboarding from "../../pages/Onboarding/Onboarding";

type NotRegisteredModalProps = {
  open: boolean;
  data: any;
};
export default function NotRegisteredModal(props: NotRegisteredModalProps) {
  return (
    <Modal
      aria-labelledby="spring-modal-title"
      aria-describedby="spring-modal-description"
      open={props.open}
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          TransitionComponent: Fade,
        },
      }}
    >
      <Fade in={props.open}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "100%",
            height: "100%",
            maxWidth: "900px",
            maxHeight: "500px",
            backgroundColor: "white",
            boxShadow: 24,
            borderRadius: "10px",
            gap: "1rem",
          }}
        >
          {/* left side  */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "50%",
              height: "100%",
              padding: "2rem",
              backgroundColor: "#EBF2FE",
              borderRadius: "10px",
            }}
          >
            {/* top left logo  */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <CardMedia
                component="img"
                image={images.sakshamLogo}
                alt="onboarding"
                sx={{
                  width: "100px",
                }}
              />
            </Box>
            {/* description */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                alignItems: "center",
                justifyContent: "center",
                color: "#2059EE",
                marginTop: "auto",
              }}
            >
              <Typography
                sx={{
                  fontSize: "20px",
                  fontWeight: "600",
                }}
              >
                Hi {props.data?.displayName || "User"},
              </Typography>
              <Typography
                sx={{
                  fontSize: "16px",
                  textAlign: "center",
                  fontWeight: "400",
                  width: "70%",
                }}
              >
                Welcome Aboard!
              </Typography>
            </Box>
            <CardMedia
              component="img"
              image={images.onboarding}
              alt="onboarding"
              sx={{
                width: "300px",
                margin: "auto",
              }}
            />
          </Box>
          {/* right side */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "50%",
              padding: "2rem",
              borderRadius: "10px",
            }}
          >
            <Onboarding name={props.data?.displayName} />
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
}
