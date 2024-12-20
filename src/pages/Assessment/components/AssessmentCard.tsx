import { Box, Button, Typography } from "@mui/material";
import { useContext, useState } from "react";
import InstructionsModal from "../../../modals/InstructionsModal";
import { Role, UserContext } from "../../../App";

interface AssessmentProps {
  assessmentNumber: number;
  assessmentDescription: string;
  assessmentName?: string;
  assessmentInstructions?: string[];
  timeAgo?: string;
  bgColor?: string;
  startHandler?: () => void;
  totalAttempts?: number;
  userAttempts?: number;
}

export const AssessmentCard = (props: AssessmentProps) => {
  // modal configs here
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { role } = useContext(UserContext);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "400px",
          height: "250px",
          backgroundColor: "#fff",
          boxShadow: "0px 0px 30.2px 0px #32558930",
          borderRadius: "5px",
          position: "relative",
        }}
      >
        {/* header here */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: props.bgColor ? props.bgColor : "#EC6980",
            padding: "10px 30px",
            borderRadius: "5px 5px 0px 0px",
          }}
        >
          <Typography
            sx={{
              fontSize: "18px",
              color: "#fff",
              fontWeight: "bold",
            }}
          >
            {props.assessmentName ? props.assessmentName : "Assessment"}
          </Typography>

          {/* {props.userAttempts && props.totalAttempts && ( */}
          <Typography
            sx={{
              fontSize: "16px",
              color: "#fff",
              padding: "5px 10px",
              borderRadius: "5px",
              backgroundColor: "#D01215",
            }}
          >
            {props.userAttempts} / {props.totalAttempts} Attempts
          </Typography>
          {/* // )} */}
        </Box>

        {/* body here */}
        <Box
          sx={{
            padding: "20px",
          }}
        >
          <Typography
            sx={{
              fontSize: "16px",
              color: "#333",
            }}
          >
            Assessment {props.assessmentNumber}
          </Typography>
          <Typography
            sx={{
              fontSize: "16px",
              color: "#333",
            }}
          >
            {props.assessmentDescription || "No Description"}
          </Typography>
        </Box>

        {/* footer here */}
        {props.timeAgo && (
          <Typography
            sx={{
              position: "absolute",
              bottom: "0",
              right: "0",
              padding: "10px 30px",
              fontSize: "18px",
              color: "lightgrey",
            }}
          >
            {props.timeAgo}
          </Typography>
        )}

        {/* button here */}
        {props.startHandler && role === Role.STUDENT && (
          <Button
            sx={{
              mt: "auto",
              fontSize: "18px",
              color: "#fff",
              backgroundColor: "#455A64",
              borderRadius: "0px 0px 5px 5px",
              "&:hover": {
                backgroundColor: "#455A64",
                color: "#fff",
              },
            }}
            onClick={handleOpen}
          >
            Start Assessment
          </Button>
        )}
      </Box>

      <InstructionsModal
        open={open}
        close={handleClose}
        submitHandler={props.startHandler || (() => {})}
        data={props.assessmentInstructions || []}
      />
    </>
  );
};
