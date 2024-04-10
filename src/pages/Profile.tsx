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
      {/* <Button
        sx={{ marginX: "5vw", borderRadius: 10, textTransform: "none" }}
        className="chapter-button"
        variant="contained"
      >
        My Highlights
      </Button> */}
      <div className="streak-header">
        <Whatshot />
        <div>DAILY STREAK</div>
      </div>
      <div className="streak-container">
        {[...Array(7)].map((_, index) => (
          <div key={index} className="streak-circle streak-circle-blue">
            <div>{index + 1}</div>
          </div>
        ))}
      </div>
      <div className="streak-stats-container">
        <div className="streak-stat">
          <div>Current Streak</div>
          <div>4 days</div>
        </div>
        <div className="streak-stat">
          <div>Longest Streak</div>
          <div>10 days</div>
        </div>
      </div>

      <div className="stats-container">
        <div className="stat">
          <AccessTime />
          <div>Total Learning time: 5hrs</div>
        </div>
        <div className="stat">
          <Whatshot />
          <div>Videos Watched: 35</div>
        </div>
        <div className="stat">
          <Whatshot />
          <div>Quizzes Taken: 35</div>
        </div>
      </div>
      <Button variant="contained" color="secondary" onClick={logOut}>
        Sign Out
      </Button>
    </div>
  );
}

export default Profile;
