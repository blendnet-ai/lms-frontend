import {
  Backdrop,
  Box,
  Button,
  Fade,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../configs/firebase";

type modalProps = {
  open: boolean;
  close: () => void;
};

interface IFormInputs {
  email: string;
}

export default function ForgotPassword(props: modalProps) {
  const [passwordResetEmailSent, setPasswordResetEmailSent] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<IFormInputs>();

  const onPasswordResetInit: SubmitHandler<IFormInputs> = async (data) => {
    console.log("clicked");
    try {
      await sendPasswordResetEmail(auth, data.email);
      setPasswordResetEmailSent(true);
    } catch (error: any) {
      if (error.code === "auth/user-not-found") {
        setError("email", {
          type: "validate",
          message: "User with the given email not found",
        });
      }
    }
  };

  return (
    <Modal
      aria-labelledby="spring-modal-title"
      aria-describedby="spring-modal-description"
      open={props.open}
      onClose={props.close}
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          TransitionComponent: Fade,
        },
      }}
    >
      <Fade in={props.open}>
        <Box
          component={"form"}
          onSubmit={handleSubmit(onPasswordResetInit)}
          sx={{
            display: "flex",
            flexDirection: "column",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "auto",
            height: "auto",
            maxWidth: "500px",
            maxHeight: "500px",
            backgroundColor: "white",
            boxShadow: 24,
            borderRadius: "10px",
            gap: "1rem",
            padding: "2rem",
          }}
        >
          {/* top right close button */}
          <IconButton
            sx={{
              position: "absolute",
              top: "10px",
              right: "10px",
              color: "black",
            }}
            onClick={props.close}
          >
            <CloseIcon />
          </IconButton>

          {/* main content  */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              height: "100%",
            }}
          >
            {/* title */}
            <Typography
              sx={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                mb: "0.5rem",
              }}
            >
              Reset your password
            </Typography>

            {/* description */}
            <Typography
              sx={{
                fontSize: "1rem",
                fontWeight: "normal",
              }}
            >
              Enter your email address you used to register with us.
            </Typography>

            {/* email input */}
            <TextField
              type="email"
              placeholder="Your Email"
              size="small"
              sx={{
                my: "1rem",
              }}
              {...register("email", {
                required: "Please enter the email",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Please enter a valid email",
                },
              })}
              error={!!errors.email}
              helperText={errors.email ? errors.email.message?.toString() : ""}
              disabled={passwordResetEmailSent}
            />
            {/* button group */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                gap: "1rem",
              }}
            >
              <Button
                sx={{
                  backgroundColor: "#E0E0E0",
                  padding: "0.5rem 1rem",
                  "&:hover": {
                    backgroundColor: "#EDEDED",
                  },
                }}
                onClick={props.close}
              >
                <Typography
                  sx={{
                    fontWeight: 700,
                    color: "#000",
                    textTransform: "none",
                  }}
                >
                  Back to Login
                </Typography>
              </Button>
              <Button
                sx={{
                  backgroundColor: passwordResetEmailSent
                    ? "#BDBDBD"
                    : "#2962FF",
                  padding: "0.5rem 1rem",
                  "&:hover": {
                    backgroundColor: "#2059EE",
                  },
                  cursor: passwordResetEmailSent ? "not-allowed" : "pointer",
                }}
                type="submit"
                disabled={passwordResetEmailSent}
              >
                <Typography
                  sx={{
                    fontWeight: 700,
                    color: "#fff",
                    textTransform: "none",
                  }}
                >
                  Send Instructions
                </Typography>
              </Button>
            </Box>

            {passwordResetEmailSent && (
              <Typography sx={{ mt: "1rem", color: "#4CAF50" }}>
                If an account with this email exists, a password reset email has
                been sent.
              </Typography>
            )}
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
}
