import { signOut } from "firebase/auth";
import { auth } from "../configs/firebase";
import { useNavigate } from "react-router-dom";
import "./../styles/Dashboard.css";
import { Button, CircularProgress } from "@mui/material";
import {
  Whatshot,
  AccessTime,
  Circle,
  QuestionAnswer,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import DashboardAPI, { GetUserDataResponse } from "../apis/DashboardAPI";
import { dark } from "@mui/material/styles/createPalette";
import { stat } from "fs";

function Dashboard() {
  const [stats, setStats] = useState<GetUserDataResponse | null>(null);

  useEffect(() => {
    (async () => {
      const stats = await DashboardAPI.getUserData();
      setStats(stats);
    })();
  }, []);

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

  let currentDayOfMonth = new Date(
    new Date().getTime() + 24 * 60 * 60 * 1000
  ).getDate(); // Get current date

  return (
    <div className="Dashboard">
      <img className="profile-img" src={getProfileImage()} />
      <div>{getName()}</div>
      {/* <Button
        sx={{ marginX: "5vw", borderRadius: 10, textTransform: "none" }}
        className="chapter-button"
        variant="contained"
      >
        My Highlights
      </Button> */}
      {stats && (
        <>
          <div className="streak-header">
            <Whatshot />
            <div>DAILY STREAK</div>
          </div>
          <div className="streak-container">
            {[...Array(7)].map((_, index) => {
              let circleClass = "streak-circle";

              if (index == 6) {
                circleClass += " streak-circle-blue";
              } else if (5 - stats.daily_streak >= index) {
                circleClass += " streak-circle-gray";
              } else {
                circleClass += " streak-circle-green";
              }
              return (
                <div key={index} className={circleClass}>
                  <div>{currentDayOfMonth - (6 - index)}</div>
                </div>
              );
            })}
          </div>
          <div className="streak-stats-container">
            <div className="streak-stat">
              <div>Current Streak</div>
              <div>{stats.daily_streak} days</div>
            </div>
            <div className="streak-stat">
              <div>Longest Streak</div>
              <div>{stats.longest_streak} days</div>
            </div>
          </div>

          <div className="stats-container">
            <div className="stat">
              <AccessTime />
              <div>Total Learning time: {stats.time_spent}</div>
            </div>
            <div className="stat">
              <Whatshot />
              <div>Videos Watched: {stats.videos_watched}</div>
            </div>
            <div className="stat">
              <Whatshot />
              <div>Quizzes Taken: {stats.quizzes_attempted}</div>
            </div>
            <div className="stat">
              <QuestionAnswer />
              <div>Total Conversations: {stats.chat_count}</div>
            </div>
          </div>
        </>
      )}
      {!stats && <CircularProgress />}
    </div>
  );
}

export default Dashboard;
