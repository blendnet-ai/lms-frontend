//import "./sentry-setup";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  CardMedia,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { auth } from "./configs/firebase";
import { useEffect, useState } from "react";
import { User } from "firebase/auth";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import LoginProtectedRoute from "./components/LoginProtectedRoute";
import { icons, images } from "./assets";
import LMSAPI from "./apis/LmsAPI";
import { createContext } from "react";
import OnboardingLms from "./pages/Onboarding/OnboardingLms";
import Courses from "./pages/Courses";
import AssessmentHome from "./pages/Assessment/AssessmentHome";
import Modules from "./pages/Modules";
import Batches from "./pages/Batches";
import NoRole from "./pages/NoRole";
import Login from "./pages/Login";
import SupportPage from "./pages/SupportPage";
import AssessmentsResults from "./pages/Assessment/AssessmentsResults";
import InfoIcon from "@mui/icons-material/Info";
import AssessmentIcon from "@mui/icons-material/Assessment";
import Homepage from "./pages/Homepage";
import Assessment from "./pages/Assessment/Assessment";
import VideocamIcon from "@mui/icons-material/Videocam";
import Recordings from "./pages/Recordings";
import GroupIcon from "@mui/icons-material/Group";
import Students from "./pages/Student/Students";
import StudentDashboard from "./pages/Student/StudentDashboard";
import AssessmentReport from "./pages/Assessment/AssessmentReport";

export enum Role {
  STUDENT = "student",
  LECTURER = "lecturer",
  COURSE_PROVIDER_ADMIN = "course_provider_admin",
  NO_ROLE = "no_role",
}

interface UserContextType {
  role: Role;
}

export const UserContext = createContext<UserContextType>({
  role: Role.NO_ROLE,
});

function App() {
  const [user, setUser] = useState<User | null>();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState<Role>(Role.NO_ROLE);
  const [lockSidebarWhenNotOnboarding, setLockSidebarWhenNotOnboarding] =
    useState(false);

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
    const checkOnboardingStatus = async () => {
      try {
        const response = await LMSAPI.getOnboardingStatus();
        if (response.role == Role.NO_ROLE) {
          navigate("/no-role");
          return;
        }

        if (
          !response.telegram_status ||
          !response.mobile_verification_status ||
          !response.onboarding_status ||
          !response.onboarding_cv_status
        ) {
          navigate("/onboarding-lms");
          setLockSidebarWhenNotOnboarding(true);
        } else {
          setLockSidebarWhenNotOnboarding(false);
        }
        setUserRole(response.role);
      } catch (error) {
        console.error("Error checking onboarding status:", error);
      }
    };
    if (user) checkOnboardingStatus();
  }, [user, navigate]);

  const toggleDrawer = (newOpen: boolean) => () => {
    setDrawerOpen(newOpen);
  };

  const [profileAnchorEl, setProfileAnchorEl] = useState<null | HTMLElement>(
    null
  );

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {[
          { text: "Home", path: "/", icon: icons.homeTab, icon_Type: "svg" },
          {
            text: "Courses",
            path: "/courses",
            icon: icons.coursesTab,
            icon_Type: "svg",
          },
          ...(userRole !== Role.LECTURER &&
          userRole !== Role.COURSE_PROVIDER_ADMIN
            ? [
                {
                  text: "Assessments Results",
                  path: "/assessment-results",
                  icon: (
                    <AssessmentIcon
                      sx={{
                        color:
                          window.location.pathname === "/assessment-results"
                            ? "white"
                            : "inherit",
                      }}
                    />
                  ),
                  icon_Type: "icon",
                },
              ]
            : []),
          ...(userRole === Role.COURSE_PROVIDER_ADMIN
            ? [
                {
                  text: "Students",
                  path: "/students",
                  icon: (
                    <GroupIcon
                      sx={{
                        color:
                          window.location.pathname === "/students"
                            ? "white"
                            : "inherit",
                      }}
                    />
                  ),
                  icon_Type: "icon",
                },
              ]
            : []),
          {
            text: "Recordings",
            path: "/recordings",
            icon: (
              <VideocamIcon
                sx={{
                  color:
                    window.location.pathname === "/recordings"
                      ? "white"
                      : "inherit",
                }}
              />
            ),
            icon_Type: "icon",
          },
          {
            text: "Help & Support",
            path: "/help-support",
            icon: (
              <InfoIcon
                sx={{
                  color:
                    window.location.pathname === "/help-support"
                      ? "white"
                      : "inherit",
                }}
              />
            ),
            icon_Type: "icon",
          },
        ].map(({ text, path, icon, icon_Type }) => (
          <ListItem key={text} disablePadding>
            <ListItemButton
              onClick={() => navigate(path)}
              sx={{
                backgroundColor:
                  window.location.pathname === path ? "#2059EE" : "transparent",
                color: window.location.pathname === path ? "white" : "inherit",
                "&:hover": {
                  backgroundColor:
                    window.location.pathname === path ? "#2059EE" : undefined,
                },
              }}
            >
              <ListItemIcon>
                {icon_Type === "svg" && typeof icon === "string" ? (
                  <img
                    src={icon}
                    alt={text}
                    style={{
                      width: "24px",
                      height: "24px",
                      filter:
                        window.location.pathname === path
                          ? "brightness(0) invert(1)"
                          : undefined,
                    }}
                  />
                ) : (
                  icon
                )}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <Box
        className="App"
        sx={{
          padding: "24px",
          backgroundColor: "#EFF6FF",
          height: "100%",
          minHeight: "100vh",
        }}
      >
        {userRole != Role.NO_ROLE && (
          <Box
            sx={{
              display: "flex",
              visibility: user ? "visible" : "hidden",
            }}
          >
            <IconButton
              sx={{
                margin: "0px",
                padding: "0px",
                width: "50px",
                height: "50px",
              }}
              edge="start"
              color="primary"
              size="large"
              aria-label="drawerOpen drawer"
              disabled={lockSidebarWhenNotOnboarding}
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>

            <Drawer open={drawerOpen} onClose={toggleDrawer(false)}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "10px 0",
                    backgroundImage: `url(${images.dotted})`,
                    backgroundRepeat: "repeat",
                  }}
                >
                  <img
                    src={images.sakshmAILogo}
                    alt="Sakshm AI Logo"
                    style={{ height: "40px" }}
                  />
                  <Box
                    sx={{
                      backgroundColor: "gray",
                      width: "fit-content",
                      padding: "6px",
                      borderRadius: "10px",
                      marginTop: "16px",
                    }}
                  >
                    <Typography sx={{ color: "white", fontWeight: "bold" }}>
                      {userRole
                        ?.split("_")
                        .map(
                          (word) =>
                            word.charAt(0).toUpperCase() +
                            word.slice(1).toLowerCase()
                        )
                        .join(" ")}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              {DrawerList}

              {/* bottom image  */}
              <Box
                sx={{
                  position: "absolute",
                  bottom: "0",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  padding: "10px",
                }}
              >
                <CardMedia
                  component="img"
                  image={icons.parterLogo}
                  alt="partner logo"
                  sx={{ width: "100%", height: "auto" }}
                />
              </Box>
            </Drawer>
            <Box
              sx={{ display: "flex", alignItems: "center", ml: "auto", p: 1 }}
            >
              <Box sx={{ position: "relative" }}>
                <IconButton
                  onClick={(e) => setProfileAnchorEl(e.currentTarget)}
                  sx={{ padding: "0px" }}
                >
                  {user && user.photoURL ? (
                    <Avatar
                      src={user.photoURL}
                      alt={user.email || ""}
                      sx={{ width: 50, height: 50 }}
                    />
                  ) : (
                    <Avatar sx={{ width: 50, height: 50 }}>
                      {user?.email?.charAt(0).toUpperCase()}
                    </Avatar>
                  )}
                </IconButton>
                <Menu
                  anchorEl={profileAnchorEl}
                  open={Boolean(profileAnchorEl)}
                  onClose={() => setProfileAnchorEl(null)}
                >
                  <MenuItem
                    onClick={() => {
                      auth.signOut();
                      setProfileAnchorEl(null);
                      localStorage.clear();
                    }}
                  >
                    Logout
                  </MenuItem>
                </Menu>
              </Box>
            </Box>
          </Box>
        )}

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              height: "100%",
              alignItems: "center",
            }}
          >
            <UserContext.Provider value={{ role: userRole }}>
              <Routes>
                <Route
                  path="/"
                  element={
                    <LoginProtectedRoute>
                      <Homepage />
                    </LoginProtectedRoute>
                  }
                />
                <Route path="/login" element={<Login />} />
                <Route
                  path="/courses"
                  element={
                    <LoginProtectedRoute>
                      <Courses />
                    </LoginProtectedRoute>
                  }
                />

                <Route
                  path="/onboarding-lms"
                  element={
                    <LoginProtectedRoute>
                      <OnboardingLms />
                    </LoginProtectedRoute>
                  }
                />
                <Route
                  path="/assessment"
                  element={
                    <LoginProtectedRoute>
                      <AssessmentHome />
                    </LoginProtectedRoute>
                  }
                />
                <Route
                  path="/assessment-start"
                  element={
                    <LoginProtectedRoute>
                      <Assessment />
                    </LoginProtectedRoute>
                  }
                />

                <Route
                  path="/modules/:courseName"
                  element={
                    <LoginProtectedRoute>
                      <Modules />
                    </LoginProtectedRoute>
                  }
                />
                <Route
                  path="/assessment-results"
                  element={
                    <LoginProtectedRoute>
                      <AssessmentsResults />
                    </LoginProtectedRoute>
                  }
                />
                <Route
                  path="/assessment-results/report/:assessmentId"
                  element={
                    <LoginProtectedRoute>
                      <AssessmentReport />
                    </LoginProtectedRoute>
                  }
                />
                <Route
                  path="/help-support"
                  element={
                    <LoginProtectedRoute>
                      <SupportPage />
                    </LoginProtectedRoute>
                  }
                />
                <Route
                  path="/batches"
                  element={
                    <LoginProtectedRoute>
                      <Batches />
                    </LoginProtectedRoute>
                  }
                />
                <Route
                  path="/recordings"
                  element={
                    <LoginProtectedRoute>
                      <Recordings />
                    </LoginProtectedRoute>
                  }
                />
                <Route
                  path="/students"
                  element={
                    <LoginProtectedRoute>
                      <Students />
                    </LoginProtectedRoute>
                  }
                />
                <Route
                  path="/students/:studentId"
                  element={
                    <LoginProtectedRoute>
                      <StudentDashboard />
                    </LoginProtectedRoute>
                  }
                />
                <Route
                  path="/no-role"
                  element={
                    <LoginProtectedRoute>
                      <NoRole userData={user?.email || ""} />
                    </LoginProtectedRoute>
                  }
                />
              </Routes>
            </UserContext.Provider>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default App;
