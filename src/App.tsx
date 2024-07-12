import "./App.css";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Dashboard from "./old-flow/pages/Dashboard";
import LearningWrapper from "./old-flow/pages/Learning";
import VideoHistory from "./old-flow/pages/VideoHistory";
import BugReport from "./components/BugReport/BugReport";
import { IconButton } from "@mui/material";
import {
  AccountBox,
  Dashboard as DashboardIcon,
  RecordVoiceOver,
  History,
  School,
} from "@mui/icons-material";
import Practice from "./old-flow/pages/Practice";
import ReportWrapper from "./old-flow/pages/ReportWrapper";
import env from "react-dotenv";
import Onboarding from "./pages/Onboarding/Onboarding";
import Home from "./pages/Home/Home";
import EvaluationTestRoutes from "./components/EvaluationTestRoutes/EvaluationTestRoutes";
import EvalReport from "./pages/EvalReport/EvalReport";
import EvalSubmitted from "./pages/EvalSubmitted/EvalSubmitted";
import Profile from "./pages/Profile/Profile";
import EvalHistory from "./pages/EvalHistory/EvalHistory";
import { icons } from "./assets";
import Landing from "./pages/Landing/Landing";
import Login from "./pages/Login/Login";
import CVBuilder from "./pages/CVBuilder/CVBuilder";

import Testing from "./pages/Landing/Testing";
import Terms from "./components/FooterPages/Terms";
import Refund from "./components/FooterPages/Refund";
import Privacy from "./components/FooterPages/Privacy";
import Test from "./pages/Test";
import ResetPassword from "./pages/Login/ResetPassword";
import DSATest, { DSAPracticeStart } from "./components/DSATest/DSATest";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="App">
      {env.NEW_FLOW === "FALSE" && (
        <>
          {location.pathname !== "/login" && (
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
      {env.NEW_FLOW === "TRUE" && (
        <>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/testing" element={<Testing />} />
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
            <Route path="/resume/:username/:slug" element={<CVBuilder />} />
            <Route
              path="/resume"
              element={
                <ProtectedRoute>
                  <CVBuilder />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dsa-practice"
              element={
                <ProtectedRoute>
                  <DSATest />
                </ProtectedRoute>
              }
            />
          </Routes>
          <EvaluationTestRoutes />
        </>
      )}
      <BugReport />
    </div>
  );
}

export default App;
