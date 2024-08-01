import {
  Backdrop,
  Box,
  Button,
  CardMedia,
  Fade,
  Modal,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import { images } from "../../assets";

type NotRegisteredModalProps = {
  open: boolean;
  handleClose: () => void;
};
export default function NotRegisteredModal(props: NotRegisteredModalProps) {
  return (
    <Modal
      aria-labelledby="spring-modal-title"
      aria-describedby="spring-modal-description"
      open={props.open}
      onClose={props.handleClose}
      closeAfterTransition
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
            width: "40%",
            minWidth: "340px",
            backgroundColor: "white",
            boxShadow: 24,
            borderRadius: "10px",
            padding: { xs: "2rem", md: "2rem 4rem" },
          }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: {
                  xs: "column-reverse",
                  md: "column-reverse",
                },
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                gap: "2rem",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "2rem",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontSize: { xs: "1rem", md: "1.5rem" },
                    color: "black",
                    textAlign: "center",
                  }}
                >
                  Your email is not registered with us. Please contact your
                  college admin to get you registered.
                </Typography>
                <Button
                  size="large"
                  fullWidth
                  variant="contained"
                  sx={{
                    backgroundColor: "white",
                    color: "#3366ff",
                    "&:hover": {
                      backgroundColor: "white",
                    },
                    width: "50%",
                  }}
                  onClick={props.handleClose}
                >
                  Close
                </Button>
              </Box>
              <CardMedia
                component="img"
                sx={{
                  width: { xs: "70%", md: "50%" },
                  objectFit: "contain",
                }}
                image={images.wrongLoginCred}
                alt="landing page image"
              />
            </Box>
          </motion.div>
        </Box>
      </Fade>
    </Modal>
  );
}
