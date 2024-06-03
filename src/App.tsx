import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import {
  Routes,
  Route,
  BrowserRouter,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Login from "./pages/Login";
import LearningWrapper from "./pages/Learning";
import VideoHistory from "./pages/VideoHistory";
import OldProfile from "./pages/OldProfile";
import { IconButton } from "@mui/material";
import {
  AccountBox,
  Dashboard as DashboardIcon,
  RecordVoiceOver,
  History,
  School,
} from "@mui/icons-material";
import Practice from "./pages/Practice";

import ReportWrapper from "./pages/ReportWrapper";
import env from "react-dotenv";
import Landing from "./pages/Landing";
import { useEffect } from "react";
import Onboarding from "./pages/Onboarding";
import Home from "./pages/Home";
import Evaluation from "./pages/Evaluation";
import EvaluationTestRoutes from "./components/EvaluationTestRoutes";
import EvalReport from "./pages/eval/EvalReport";
import EvalSubmitted from "./pages/eval/EvalSubmitted";
import Profile from "./pages/Profile";
import EvalHistory from "./pages/eval/EvalHistory";
import { icons } from "./assets";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="App">
      {env.NEW_FLOW == "FALSE" && (
        <>
          {location.pathname != "/login" && (
            <div id="top-bar">
              {" "}
              {/* <div className="top-bar-inner-container">
            <Psychology />
            <div>IIT Kanpur</div>
          </div>
          <div>Business English</div>
          <div className="top-bar-inner-container">
            <StarRate />
            <div>7</div>
          </div> */}
              <h2>AI Learning</h2>
              <IconButton
                sx={{
                  margin: "0px",
                }}
                onClick={() => navigate("/")}
              >
                <School fontSize="medium" />
              </IconButton>
              <IconButton
                sx={{
                  margin: "0px",
                }}
                onClick={() => navigate("/practice")}
              >
                <RecordVoiceOver fontSize="medium" />
              </IconButton>
              <IconButton
                sx={{
                  margin: "0px",
                }}
                onClick={() => navigate("/dashboard")}
              >
                <DashboardIcon fontSize="medium" />
              </IconButton>
              <IconButton
                sx={{
                  margin: "0px",
                }}
                onClick={() => navigate("/video-history")}
              >
                <History fontSize="medium" />
              </IconButton>
              <IconButton
                sx={{
                  margin: "0px",
                }}
                onClick={() => navigate("/profile")}
              >
                <AccountBox fontSize="medium" />
              </IconButton>
            </div>
          )}
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <LearningWrapper />
                </ProtectedRoute>
              }
            />
            {/* <Route
            path="/highlights"
            element={
              <ProtectedRoute>
                <MyHighlights />
              </ProtectedRoute>
            }
          /> */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/video-history"
              element={
                <ProtectedRoute>
                  <VideoHistory />
                </ProtectedRoute>
              }
            />
            <Route
              path="/practice"
              element={
                <ProtectedRoute>
                  <Practice />
                </ProtectedRoute>
              }
            />
            <Route
              path="/report/*"
              element={
                <ProtectedRoute>
                  <ReportWrapper />
                </ProtectedRoute>
              }
            />
          </Routes>
        </>
      )}
      {env.NEW_FLOW == "TRUE" && (
        <>
          <div className="top-header-container">
            <img src={icons.headerLogo} alt="" />
          </div>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Landing />} />
            <Route
              path="/onboarding"
              element={
                <ProtectedRoute>
                  <Onboarding />
                </ProtectedRoute>
              }
            />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/old-profile"
              element={
                <ProtectedRoute>
                  <OldProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/report"
              element={
                <ProtectedRoute>
                  <EvalReport />
                </ProtectedRoute>
              }
            />
            <Route
              path="/eval-submitted"
              element={
                <ProtectedRoute>
                  <EvalSubmitted />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/eval-history"
              element={
                <ProtectedRoute>
                  <EvalHistory />
                </ProtectedRoute>
              }
            />
          </Routes>
          <EvaluationTestRoutes />
        </>
      )}
    </div>
  );
}

export default App;
