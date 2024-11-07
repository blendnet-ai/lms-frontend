import {
  Backdrop,
  Box,
  Button,
  CardMedia,
  Fade,
  Modal,
  Typography,
} from "@mui/material";
import { images } from "../../../assets";

type MockInterviewModalProps = {
  open: boolean;
  close: () => void;
  submit: () => void;
  title?: string;
  description?: string;
};

const MockInterviewModal = (props: MockInterviewModalProps) => {
  return (
    <Modal
      aria-labelledby="mock-Interview-modal-title"
      aria-describedby="mock-Interview-modal-description"
      open={props.open}
      onClose={props.close}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={props.open}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 700,
            backgroundColor: "#FFFFFF",
            boxShadow: "0px 4px 4px 0px #205EFF26",
            p: 4,
            borderRadius: 2,
          }}
        >
          <CardMedia
            component="img"
            image={images.confirmSubmitVector}
            alt={props.title}
            sx={{
              width: 150,
              height: 150,
              margin: "auto",
              objectFit: "contain",
            }}
          />
          <Typography
            id="confirmation-modal-title"
            sx={{
              mt: 2,
              fontWeight: 600,
              fontSize: "1.5rem",
              textAlign: "center",
            }}
          >
            {props.title}
          </Typography>
          <Typography
            id="mock-Interview-modal-description"
            sx={{
              mt: 2,
              fontSize: "1rem",
              textAlign: "center",
              width: "80%",
            }}
          >
            {props.description}
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "1rem",
              mt: 4,
            }}
          >
            {["Nah, Go back", "Yes, Next"].map((option) => (
              <Button
                key={option}
                sx={{
                  backgroundColor: "#2059EE",
                  color: "white",
                  borderRadius: "10px",
                  "&:hover": {
                    backgroundColor: "#2059EE",
                  },
                }}
                onClick={option === "Nah, Go back" ? props.close : props.submit}
              >
                <Typography
                  sx={{
                    fontSize: 14,
                    textTransform: "none",
                  }}
                >
                  {option}
                </Typography>
              </Button>
            ))}
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default MockInterviewModal;
