import * as React from "react";
import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import BugReportIcon from "@mui/icons-material/BugReport";
import mailtoLink from "../../utils/mailTo";
import { useLocation } from "react-router-dom";

export default function BugReport() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const actions = [
    {
      icon: <BugReportIcon />,
      name: "Report Bug",
      actionFunction: () => {
        window.location.href = mailtoLink;
      },
    },
  ].filter((action) => action !== null);
  const location = useLocation();
  const testRegex = /-test$/;
  const restrictedRoutes = ["/", "/login"];

  React.useEffect(() => {}, [location.pathname]);

  const isTestRoute = testRegex.test(location.pathname);
  return (
    <Box
      sx={{
        display: restrictedRoutes.includes(location.pathname)
          ? "none"
          : "block",
        position: "fixed",
        top: isTestRoute ? "10%" : null,
        bottom: isTestRoute ? "10%" : "0%",
        right: "0%",
        height: 330,
        transform: "translateZ(0px)",
        flexGrow: 1,
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
