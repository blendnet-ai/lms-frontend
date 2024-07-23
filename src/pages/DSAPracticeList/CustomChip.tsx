import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { Chip } from "@mui/material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface ModalComponentProps {
  open: boolean;
  handleClose: () => void;
  children: React.ReactNode;
}

const ModalComponent: React.FC<ModalComponentProps> = ({
  open,
  handleClose,
  children,
}) => {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={style}>{children}</Box>
      </Fade>
    </Modal>
  );
};

export default ModalComponent;

interface CustomChipProps {
  chipText: string;
  modalContent: React.ReactNode;
}

export const CustomChip: React.FC<CustomChipProps> = ({
  chipText,
  modalContent,
}) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <React.Fragment>
      <Chip
        onClick={handleOpen}
        label={chipText}
        sx={{
          marginLeft: "5px",
          backgroundColor: "rgb(234, 241, 246)",
          color: "black",
          borderRadius: "5px",
        }}
      />
      <ModalComponent open={open} handleClose={handleClose}>
        {modalContent}
      </ModalComponent>
    </React.Fragment>
  );
};
