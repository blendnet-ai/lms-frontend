import { Box, CardMedia, IconButton, Tooltip, Typography } from "@mui/material";
import { icons } from "../../assets";
import React, { useEffect } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LogoutIcon from "@mui/icons-material/Logout";
import { signOut } from "firebase/auth";
import { auth } from "../../configs/firebase";
import { useNavigate } from "react-router-dom";
import UserDataAPI from "../../apis/UserDataAPI";

export default function ProfileOptions({ data }: any) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [nameFromBackend, setNameFromBackend] = React.useState("");

  useEffect(() => {
    const fetchData = async () => {
      const userData = await UserDataAPI.getUserData();
      setNameFromBackend(userData.name);
    };

    fetchData();

    if (data) {
      setName(data.displayName);
      setEmail(data.email);
    }
  }, [data, nameFromBackend]);

  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const logOut = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
      <Typography
        sx={{
          fontSize: "1rem",
          fontWeight: 600,
          color: "#000000",
        }}
      >
        {name
          ? name.charAt(0).toUpperCase() + name.slice(1)
          : nameFromBackend
          ? nameFromBackend
          : email
          ? email
          : "User"}
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          backgroundColor: "#DBEBFF",
          padding: 1,
          borderRadius: "50px",
        }}
      >
        {/* avatar  */}
        <CardMedia
          component="img"
          image={icons.avatar3}
          alt="avatar"
          sx={{ width: 40, height: 40, borderRadius: "50%" }}
        />
        {/* dropdown menu */}
        <Tooltip title="Account settings">
          <IconButton
            size="small"
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <ExpandMoreIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Tooltip title="Logout">
        <IconButton onClick={logOut}>
          <LogoutIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
}
