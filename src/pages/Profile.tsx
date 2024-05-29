import { signOut } from "firebase/auth";
import Header from "../components/Header";
import useUserData from "../hooks/useUserData";

import "./../styles/Profile.css";
import { HomeHeaderContent } from "./Home";
import { auth } from "../configs/firebase";
import { useNavigate } from "react-router-dom";
import { Logout } from "@mui/icons-material";

function ProfileHeaderContent() {
  const { name } = useUserData();

  return (
    <div className="ProfileHeaderContent">
      <div className="ProfileHeaderContent-container-outer">
        <div className="ProfileHeaderContent-container">{name?.at(0)}</div>
      </div>
      <h1 className="ProfileHeaderContent-name">{name}</h1>
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
      <img src={`/icons/${props.icon}.svg`} alt="" />
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

  return (
    <div className="NewProfile">
      <Header content={<ProfileHeaderContent />} />
      <div className="NewProfile-list-container">
        <ListCell name="Edit Profile Information" icon="profile" />
        <ListCell name="History" icon="history" />
        <ListCell name="Help & Support" icon="customer-service" />
        <ListCell name="Log out" icon="log-out" onClick={logOut} />
        <ListCell name="Delete account" icon="trash" />
      </div>
    </div>
  );
}
