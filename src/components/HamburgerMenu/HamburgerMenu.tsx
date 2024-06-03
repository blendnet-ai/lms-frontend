import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { Menu } from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { icons } from "../../assets";

export default function HamburgerMenu() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const navigate = useNavigate();

  const navOptions = [
    {
      name: "Home",
      page: "/home",
      icon: icons.home,
    },
    {
      name: "Test Results",
      page: "/report",
      icon: icons.report,
    },
    {
      name: "Profile",
      page: "/profile",
      icon: icons.profile1,
    },
  ];

  const drawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {navOptions.map((option, index) => (
          <>
            <ListItem key={option.name} disablePadding>
              <ListItemButton
                onClick={() => {
                  navigate(option.page);
                }}
                style={{
                  display: "flex",
                  gap: "10px",
                }}
              >
                <img src={option.icon} alt="" />
                <ListItemText primary={option.name} />
              </ListItemButton>
            </ListItem>
            <Divider />
          </>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <IconButton
        onClick={toggleDrawer(true)}
        style={{ alignSelf: "flex-start", color: "white" }}
      >
        <Menu />
      </IconButton>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {drawerList}
      </Drawer>
    </>
  );
}
