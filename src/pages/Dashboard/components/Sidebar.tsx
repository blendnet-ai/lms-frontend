import { useState } from "react";
import {
  Box,
  CardMedia,
  Drawer,
  IconButton,
  List,
  Tooltip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { icons } from "../../../assets";
import { useNavigate } from "react-router-dom";

const drawerListItems = [
  {
    name: "Home",
    icon: icons.dashboardHome,
    route: "/dashboard",
    isDisabled: false,
  },
  {
    name: "DSA Practice",
    // icon: icons.dashboardDsaPractice,
    icon: icons.code,
    route: "/dsa-practice-list",
    isDisabled: false,
  },
  {
    name: "Resume",
    icon: icons.dashboardResume,
    route: "/resume",
    isDisabled: false,
  },
  {
    name: "Mock Interview",
    icon: icons.dashboardMockInterview,
    route: "/",
    isDisabled: true,
  },
  {
    name: "Projects",
    icon: icons.dashboardProjects,
    route: "/",
    isDisabled: true,
  },
  {
    name: "Community",
    icon: icons.dashboardCommunity,
    route: "/",
    isDisabled: true,
  },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {drawerListItems.map((item, index) => (
          <ListItem key={item.name}>
            <ListItemButton
              onClick={() => navigate(item.route)}
              disabled={item.isDisabled}
            >
              <ListItemIcon>
                <CardMedia
                  component="img"
                  image={item.icon}
                  sx={{
                    width: "20px",
                    height: "20px",
                  }}
                />
              </ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box
      sx={{
        width: "50px",
        position: "fixed",
        top: "0",
        left: "0",
        backgroundColor: "white",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          color: "#fff",
          padding: "10px",
        }}
      >
        <IconButton onClick={toggleDrawer(true)}>
          <MenuIcon />
        </IconButton>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            color: "#fff",
            padding: "10px",
            gap: "10px",
          }}
        >
          {drawerListItems.map((item, index) => (
            <Tooltip title={item.name} key={item.name} placement="right">
              <IconButton
                onClick={() => navigate(item.route)}
                disabled={item.isDisabled}
              >
                <CardMedia
                  component="img"
                  image={item.icon}
                  sx={{
                    width: "20px",
                    height: "20px",
                  }}
                />
              </IconButton>
            </Tooltip>
          ))}
        </Box>
      </Box>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </Box>
  );
}
