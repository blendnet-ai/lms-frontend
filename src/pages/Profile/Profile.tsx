import { signOut } from "firebase/auth";
import Header from "../../components/Header/Header";
import useUserData from "../../hooks/useUserData";

import "./Profile.css";
import { auth } from "../../configs/firebase";
import { useNavigate } from "react-router-dom";
import { Logout } from "@mui/icons-material";
import HamburgerMenu from "../../components/HamburgerMenu/HamburgerMenu";
import { icons } from "../../assets";
import formatName from "../../utils/formatName";
import { Box, Link, Typography } from "@mui/material";
import mailtoLink from "../../utils/mailTo";

function ProfileHeaderContent() {
  const { name } = useUserData();

  return (
    <div className="ProfileHeaderContent">
      <HamburgerMenu />
      <div className="ProfileHeaderContent-container-outer">
        <div className="ProfileHeaderContent-container">
          {name ? name.charAt(0).toUpperCase() : ""}
        </div>
      </div>
      <h1 className="ProfileHeaderContent-name">
        {name &&
          formatName(name, {
            firstNameOnly: true,
            lastNameOnly: false,
            upperCase: false,
            lowerCase: false,
            titileCase: false,
            sentenceCase: true,
          })}
      </h1>
    </div>
  );
}

type ListCellProps = {
  name: string;
  icon: string;
  onClick?: () => void;
};

function ListCell(props: ListCellProps) {
  return (
    <div className="ListCell" onClick={props.onClick}>
      <img src={props.icon} alt="" />
      <div>{props.name}</div>
    </div>
  );
}

export default function Profile() {
  const navigate = useNavigate();

  const logOut = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  const handleHistoryClick = () => {
    navigate("/eval-history");
  };

  return (
    <div className="NewProfile">
      <Header content={<ProfileHeaderContent />} />
      <div className="NewProfile-list-container">
        {/* <ListCell name="Edit Profile Information" icon="profile" /> */}
        <ListCell
          onClick={handleHistoryClick}
          name="History"
          icon={icons.history}
        />
        {/* <ListCell name="Help & Support" icon="customer-service" /> */}
        <ListCell name="Log out" icon={icons.logOut} onClick={logOut} />
        {/* <ListCell name="Delete account" icon={"trash"} /> */}
      </div>

      {/* For reporting any bugs or support, please reach out to support@blendnet.ai */}
      <Box>
        <Typography variant="body2" color="textSecondary" align="center">
          For reporting any bugs or support, please reach out to{" "}
          <Link href={mailtoLink} style={{ color: "#8c54f6" }}>
            support@blendnet.ai
          </Link>
        </Typography>
      </Box>
    </div>
  );
}
