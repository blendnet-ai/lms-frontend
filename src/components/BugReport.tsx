import * as React from "react";
import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import BugReportIcon from "@mui/icons-material/BugReport";
import { useLocation } from "react-router-dom";
import { auth } from "../configs/firebase";
import { generateReportLink } from "../utils/mailTo";

export default function BugReport() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const actions = [
    {
      icon: <BugReportIcon />,
      name: "Report Bug",
      actionFunction: () => {
        handleReport();
      },
    },
  ].filter((action) => action !== null);
  const location = useLocation();
  const restrictedRoutes = [""];

  const Body = `
Hi Team,

I would like to report the following bug:

Bug Description: [Define the bug here]

Steps to Reproduce:
1. [Step one]
2. [Step two]
3. [Step three]

(Optional) Attached are screenshots of the issue for your reference.

Thank you for your attention to this matter.

Contact Details : 
- Logged In Email : ${auth.currentUser?.email}
- Phone Number : [Your Phone Number, in case we need to reach out to you]

Best regards,
[Your Name]
`;

  const supportEmail = "contact@sakshm.com";
  const CC =
    "sanchitsharma@blendnet.ai,yasir@blendnet.ai,vitika@blendnet.ai,abhishekpatil@blendnet.ai";

  const Subject = "Bug report: lms.sakshm.com";

  const handleReport = () => {
    const gmailLink = generateReportLink(supportEmail, CC, Subject, Body);
    window.open(gmailLink, "_blank");
  };

  return (
    <Box
      sx={{
        display: restrictedRoutes.includes(location.pathname)
          ? "none"
          : "block",
        position: "fixed",
        bottom: "0%",
        zIndex: 1000,
        height: 330,
        transform: "translateZ(0px)",
        flexGrow: 1,
        right: "0%",
      }}
    >
      <Backdrop open={open} />
      <SpeedDial
        FabProps={{
          color: "primary",
          sx: {
            width: {
              xs: 56,
              sm: 64,
              md: 72,
            },
            height: {
              xs: 56,
              sm: 64,
              md: 72,
            },
          },
        }}
        ariaLabel="quick-actions"
        sx={{
          position: "absolute",
          bottom: 16,
          right: 16,
        }}
        icon={<QuestionMarkIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action?.name}
            icon={action?.icon}
            tooltipTitle={action?.name}
            tooltipOpen
            onClick={() => action?.actionFunction()}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}
