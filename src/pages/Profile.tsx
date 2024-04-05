import { signOut } from "firebase/auth";
import { auth } from "../configs/firebase";
import { useNavigate } from "react-router-dom";
import "./../styles/Profile.css";
import { Button } from "@mui/material";
import {
  Whatshot,
  AccessTime,
  PlayCircle,
  HelpOutline,
} from "@mui/icons-material";
import Chip from "@mui/material/Chip";

function Profile() {
  const navigate = useNavigate();
  const logOut = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };
  const getProfileImage = (): string => {
    let profileImg = auth.currentUser?.photoURL;
    if (profileImg) {
      return profileImg;
    } else return "";
  };

  const getName = (): string => {
    let name = auth.currentUser?.displayName;
    if (name) {
      return name;
    } else return "";
  };
  return (
    <div className="Profile">
      <img className="profile-img" src={getProfileImage()} />
      <div>{getName()}</div>
      <Button
        sx={{ marginX: "5vw", borderRadius: 10, textTransform: "none" }}
        className="chapter-button"
        variant="contained"
      >
        My Highlights
      </Button>
      <div className="streak-header">
        <Whatshot />
        <div>DAILY STREAK</div>
      </div>
      <div className="streak-container">Streak will go here</div>
      <Chip
        avatar={<AccessTime />}
        sx={{
          width: "90vw",
          display: "flex",
          justifyContent: "space-evenly",
          borderRadius: "0px",
        }}
        label="Total Learning Time: 5 hrs"
        color="primary"
      />
      <Chip
        avatar={<Whatshot />}
        sx={{
          width: "90vw",
          display: "flex",
          justifyContent: "space-evenly",
          borderRadius: "0px",
        }}
        label={`Videos Watched: 35`}
        color="primary"
      />
      <Chip
        avatar={<Whatshot />}
        sx={{
          width: "90vw",
          display: "flex",
          justifyContent: "space-evenly",
          borderRadius: "0px",
        }}
        label="Quizzes Taken: 35         "
        color="primary"
      />
      <button onClick={logOut}> Sign Out</button>
    </div>
  );
}

export default Profile;
