import {
  Backdrop,
  Box,
  Button,
  Fade,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
type InstructionsModalProps = {
  open: boolean;
  close: () => void;
  submitHandler: () => void;
  data: string[];
};

const InstructionsModal = (props: InstructionsModalProps) => {
  const handleSubmit = () => {
    props.close();

    setTimeout(() => {
      props.submitHandler();
    }, 1000);
  };

  return (
    <Modal
      aria-labelledby="instructions-modal-title"
      aria-describedby="instructions-modal-description"
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
            width: "max-content",
            maxWidth: "700px",
            backgroundColor: "#FFFFFF",
            boxShadow: "0px 4px 4px 0px #205EFF26",
            p: 4,
            borderRadius: 2,
          }}
        >
          {/* top right corner close button */}
          <IconButton
            onClick={props.close}
            sx={{ position: "absolute", top: "10px", right: "10px" }}
          >
            <CloseIcon />
          </IconButton>

          {/* header here */}
          <Typography
            id="instructions-modal-title"
            sx={{
              fontSize: "24px",
              fontWeight: "bold",
              color: "#000000",
              mb: 2,
            }}
          >
            Instructions
          </Typography>

          {/* body here */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              width: "100%",
            }}
          >
            {props.data.map((instruction, index) => (
              <Typography
                key={index}
                sx={{
                  fontSize: "16px",
                  color: "#333",
                  mb: 2,
                }}
              >
                - {instruction}
              </Typography>
            ))}
          </Box>

          {/* button  */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 4,
            }}
          >
            <Button
              sx={{
                padding: "10px 30px",
                fontSize: "18px",
                color: "#2059EE",
                backgroundColor: "#fff",
                border: "1px solid #2059EE",
                borderRadius: "5px",
                "&:hover": {
                  backgroundColor: "#2059EE",
                  color: "#fff",
                },
              }}
              onClick={handleSubmit}
            >
              <Typography>Start Assessment</Typography>
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default InstructionsModal;
