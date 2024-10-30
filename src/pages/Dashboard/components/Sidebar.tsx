import { useState, useEffect } from "react";
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
import { icons, images } from "../../../assets";
import { useLocation, useNavigate } from "react-router-dom";
import AppsIcon from "@mui/icons-material/Apps";
import CloseIcon from "@mui/icons-material/Close";
import { Feature } from "../../../apis/Config";
import DataConfigAPI from "../../../apis/Config";

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
    name: "Doubts Solving",
    icon: icons.aiDisha,
    route: "/doubt-solving",
    isDisabled: false,
  },

  {
    name: "Resume",
    icon: icons.dashboardResume,
    route: "/resume",
    isDisabled: false,
  },
  {
    name: "Mock Interviews",
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
    name: "Support",
    icon: icons.dashboardSupport,
    route: "/support",
    isDisabled: false,
  },
];

export default function Sidebar({
  state,
  toggleSidebar,
}: {
  state: boolean;
  toggleSidebar: (newOpen: boolean) => () => void;
}) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const [enabledFeatures, setEnabledFeatures] = useState<any>([]);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const fetchEnabledFeatures = async () => {
    const data = await DataConfigAPI.enabledFeatures();
    setEnabledFeatures(data);
  };

  const isCardLocked =(cardName:String) => {
    return !enabledFeatures.some((feature:Feature) => feature.name ===cardName && feature.enabled)
  }
  useEffect(() => {
    fetchEnabledFeatures();
  }, []);


  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: "0 10px",
          }}
        >
          <CardMedia
            component="img"
            image={images.sakshamLogo}
            sx={{
              objectFit: "contain",
              width: "80px",
              height: "50px",
              ml: "10px",
              cursor: "pointer",
            }}
            onClick={() => {
              navigate("/dashboard");
              toggleSidebar(false)();
            }}
          />
          <Tooltip title="Close" placement="right">
            <IconButton onClick={toggleSidebar(false)} sx={{}}>
              <CloseIcon />
            </IconButton>
          </Tooltip>
        </Box>
        {drawerListItems.map((item, index) => (
          <ListItem key={item.name}>
            <ListItemButton
              onClick={() => {
                navigate(item.route);
                toggleSidebar(false)();
              }}
              disabled={isCardLocked(item.name)}
              selected={location.pathname === item.route}
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
        // width: "50px",
        position: "fixed",
        top: "0",
        left: "0",
        backgroundColor: "white",
        height: "100vh",
      }}
    >
      {/* <Box
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
                sx={{
                  backgroundColor:
                    location.pathname === item.route ? "#DBEBFF" : "",
                }}
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
      </Box> */}
      <Drawer open={state} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </Box>
  );
}
