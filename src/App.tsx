//import "./sentry-setup";
import "./App.css";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import BugReport from "./components/BugReport/BugReport";
import { Alert, Box, CardMedia, IconButton, Snackbar } from "@mui/material";
import { images } from "./assets";
import Login from "./pages/Login/Login";
import CVBuilder from "./pages/CVBuilder/CVBuilder";
import Terms from "./components/FooterPages/Terms";
import Refund from "./components/FooterPages/Refund";
import Privacy from "./components/FooterPages/Privacy";
import DSATest, { DSAPracticeStart } from "./components/DSATest/DSATest";
import DSAPracticeList from "./pages/DSAPracticeList/DSAPracticeList";
import DSAPracticeReport from "./pages/DSAPracticeReport/DSAPracticeReport";
import { auth } from "./configs/firebase";
import DSAPracticeHistory from "./pages/DSAPracticeHistory/DSAPracticeHistory";
import { DSAPracticeListContextProvider } from "./Context/DSAPracticeListContext";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import Sidebar from "./pages/Dashboard/components/Sidebar";
import { useEffect, useState } from "react";
import { User } from "firebase/auth";
import Landing from "./pages/Landing/Landing";
import { modalEventEmitter } from "./configs/axios";
import Support from "./pages/Support/Support";
import ProfileOptions from "./components/ProfileOptions/ProfileOptions";
import { AssessmentMode } from "./apis/EvalAPI";
import AdminChatView from "./pages/AdminChatView/AdminChatView";
import DoubtSolving from "./pages/Doubt/Pages/DoubtSolving";
import AppsIcon from "@mui/icons-material/Apps";
import { DoubtSolvingContextProvider } from "./pages/Doubt/Context/DoubtContext";
import UserDataAPI from "./apis/UserDataAPI";
import ConversationPage from "./pages/Doubt/Pages/ConversationPage";
import Interview from "./pages/MockInterview/Interview";
import InterviewMode from "./pages/MockInterview/components/InterviewMode";
import { MockInterviewContextProvider } from "./pages/MockInterview/Context/MockInterviewContext";
import InterviewReport from "./pages/MockInterview/InterviewReport";
import AssessmentHome from "./LMS/pages/AssessmentHome";
import Assessment from "./LMS/pages/Assessment";

function App() {
  const [user, setUser] = useState<User | null>();
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const location = useLocation();

  const handleCloseSnackBar = () => {
    setOpenSnackBar(false);
  };

  const navigate = useNavigate();

  const redirectToReport = (eventData: any) => {
    navigate(`/dsa-practice-report?assessment_id=${eventData.assessmentId}`);
    setOpenSnackBar(true);
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

  useEffect(() => {
    modalEventEmitter.on("pendingFeedbackAssessmentFound", redirectToReport);

    // Clean up the event listener on unmount
    return () => {
      modalEventEmitter.off("pendingFeedbackAssessmentFound", () => {});
    };
  }, []);

  const [openSidebar, setOpenSidebar] = useState(false);

  const toggleSidebar = (newOpen: boolean) => () => {
    setOpenSidebar(newOpen);
  };

  const [nameOfUser, setNameOfUser] = useState("");

  // user name for doubtsolving page
  useEffect(() => {
    const fetchUserData = async () => {
      const response = await UserDataAPI.getUserData();
      setNameOfUser(response?.name.split(" ")[0]);
    };

    if (user) {
      fetchUserData();
    }
  }, [user]);

  return (
    <>
      <div className="App">
        {import.meta.env.VITE_NEW_FLOW === "TRUE" && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
            }}
          >
            {user && (
              <Sidebar state={openSidebar} toggleSidebar={toggleSidebar} />
            )}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                // width: "calc(100% - 50px)",
                height: "100%",
                // margin: "auto",
                // marginLeft: user && { xs: "auto", md: "50px" },
                alignItems: "center",
              }}
            >
              <Box
                style={
                  // location.pathname.match(/^\/resume(\/.*)?$/) ||
                  location.pathname === "/login" ||
                  location.pathname === "/privacy-policy" ||
                  location.pathname === "/terms-of-use" ||
                  location.pathname === "/refund-policy" ||
                  location.pathname === "/assessment" ||
                  location.pathname === "/assessment-start" ||
                  location.pathname === "/"
                    ? { display: "none" }
                    : {
                        display: "flex",
                        padding: "10px",
                        backgroundColor: location.pathname.match(
                          /^\/resume(\/.*)?$/
                        )
                          ? "#FAFAFA"
                          : "#EFF6FF",
                        borderBottom: "2px solid white",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                      }
                }
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  <IconButton onClick={toggleSidebar(true)}>
                    <AppsIcon />
                  </IconButton>
                  <CardMedia
                    component="img"
                    image={images.sakshamLogo}
                    sx={{
                      width: "100px",
                      height: "30px",
                      cursor: "pointer",
                      objectFit: "contain",
                      ml: "10px",
                      mb: "8px",
                    }}
                    onClick={() => navigate("/")}
                  />
                </Box>
                <ProfileOptions data={user} />
              </Box>
              <Routes>
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <Landing />
                    </ProtectedRoute>
                  }
                />
                <Route path="/login" element={<Login />} />
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
                      <DSAPracticeList
                        assessmentMode={AssessmentMode.PRACTICE}
                      />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/dsa-lab"
                  element={
                    <ProtectedRoute>
                      <DSAPracticeList
                        assessmentMode={AssessmentMode.EVALUATION}
                      />
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
                <Route
                  path="/support"
                  element={
                    <ProtectedRoute>
                      <Support />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/doubt-solving"
                  element={
                    <ProtectedRoute>
                      <DoubtSolvingContextProvider>
                        <DoubtSolving name={nameOfUser} />
                      </DoubtSolvingContextProvider>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/mock-interview"
                  element={
                    <ProtectedRoute>
                      <MockInterviewContextProvider>
                        <Interview />
                      </MockInterviewContextProvider>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/mock-interview/:mode"
                  element={
                    <ProtectedRoute>
                      <MockInterviewContextProvider>
                        <InterviewMode />
                      </MockInterviewContextProvider>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/mock-interview/report/:mode"
                  element={
                    <ProtectedRoute>
                      <MockInterviewContextProvider>
                        <InterviewReport />
                      </MockInterviewContextProvider>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/conversation/:conversationId"
                  element={
                    <ProtectedRoute>
                      <DoubtSolvingContextProvider>
                        <ConversationPage />
                      </DoubtSolvingContextProvider>
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/admin-chat-view/:questionId/:assessmentId"
                  element={
                    <ProtectedRoute>
                      <AdminChatView />
                    </ProtectedRoute>
                  }
                />
                <Route path="/assessment" element={<AssessmentHome />} />
                <Route path="/assessment-start" element={<Assessment />} />
              </Routes>
            </Box>
          </Box>
        )}
        <BugReport />
      </div>
      <Snackbar
        open={openSnackBar}
        autoHideDuration={3000}
        onClose={handleCloseSnackBar}
      >
        <Alert
          onClose={handleCloseSnackBar}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Submit Feedback to continue
        </Alert>
      </Snackbar>
    </>
  );
}

export default App;
