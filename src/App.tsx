import "./sentry-setup";
import "./App.css";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
// import Dashboard from "./old-flow/pages/Dashboard";
import LearningWrapper from "./old-flow/pages/Learning";
import VideoHistory from "./old-flow/pages/VideoHistory";
import BugReport from "./components/BugReport/BugReport";
import { Box, Button, IconButton } from "@mui/material";
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
import { icons, images } from "./assets";
import Landing from "./pages/Landing/Landing";
import Login from "./pages/Login/Login";
import CVBuilder from "./pages/CVBuilder/CVBuilder";

import Testing from "./pages/Landing/Testing";
import Terms from "./components/FooterPages/Terms";
import Refund from "./components/FooterPages/Refund";
import Privacy from "./components/FooterPages/Privacy";
import DSATest, { DSAPracticeStart } from "./components/DSATest/DSATest";
import DSAPracticeList from "./pages/DSAPracticeList/DSAPracticeList";
import DSAPracticeReport from "./pages/DSAPracticeReport/DSAPracticeReport";
import { signOut } from "firebase/auth";
import { auth } from "./configs/firebase";
import DSAPracticeHistory from "./pages/DSAPracticeHistory/DSAPracticeHistory";
import { DSAPracticeListContextProvider } from "./Context/DSAPracticeListContext";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import Sidebar from "./pages/Dashboard/components/Sidebar";
import { useEffect, useState } from "react";
import { User } from "firebase/auth";

function App() {
  const [user, setUser] = useState<User | null>();
  const navigate = useNavigate();
  const location = useLocation();

  const logOut = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  return (
    <div className="App">
      {env.NEW_FLOW === "TRUE" && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          {user && <Sidebar />}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              marginLeft: "70px",
              height: "100%",
            }}
          >
            <div
              style={{
                backgroundColor: "#EFF6FF",
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                width: "100%",
              }}
            >
              <div
                className="top-header-container"
                style={
                  location.pathname.match(/^\/resume(\/.*)?$/) ||
                  location.pathname === "/login" ||
                  location.pathname === "/"
                    ? { display: "none" }
                    : {
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                      }
                }
              >
                <img
                  src={images.sakshamLogo}
                  alt=""
                  onClick={() => navigate("/")}
                />

                <Button
                  sx={{
                    backgroundColor: "#2059EE",
                    color: "#fff",
                    borderRadius: "10px",
                    padding: "5px 10px",
                    marginLeft: "auto",
                    marginRight: "20px",
                    marginTop: "10px",
                    "&:hover": { backgroundColor: "#2059EE" },
                  }}
                  onClick={logOut}
                >
                  Logout
                </Button>
              </div>
            </div>
            <Routes>
              {/* <Route path="/" element={<Landing />} /> */}
              <Route path="/" element={<Login />} />
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
                path="/923012"
                element={
                  <ProtectedRoute>
                    <DSAPracticeStart />
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
              <Route
                path="/dsa-practice-list"
                element={
                  <ProtectedRoute>
                    <DSAPracticeList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dsa-practice-report"
                element={
                  <ProtectedRoute>
                    <DSAPracticeReport />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dsa-practice-history"
                element={
                  <ProtectedRoute>
                    <DSAPracticeListContextProvider>
                      <DSAPracticeHistory />
                    </DSAPracticeListContextProvider>
                  </ProtectedRoute>
                }
              />
              <Route path="/privacy-policy" element={<Privacy />} />
              <Route path="/terms-of-use" element={<Terms />} />
              <Route path="/refund-policy" element={<Refund />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                }
              />
            </Routes>
            <EvaluationTestRoutes />
          </Box>
        </Box>
      )}
      <BugReport />
    </div>
  );
}

export default App;
