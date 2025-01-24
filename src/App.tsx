import "./App.css";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { auth } from "./configs/firebase";
import { useEffect, useState } from "react";
import { User } from "firebase/auth";
import { createContext } from "react";
import BugReport from "./components/BugReport";
import LoginProtectedRoute from "./components/LoginProtectedRoute";
import NoRole from "./pages/NoRole";
import StudentDashboard from "./pages/Student/StudentDashboard";
import Students from "./pages/Student/Students";
import Recordings from "./pages/Recordings";
import Batches from "./pages/Batches";
import SupportPage from "./pages/SupportPage";
import AssessmentReport from "./pages/Assessment/AssessmentReport";
import AssessmentsResults from "./pages/Assessment/AssessmentsResults";
import Modules from "./pages/Modules";
import AssessmentHome from "./pages/Assessment/AssessmentHome";
import OnboardingLms from "./pages/Onboarding/OnboardingLms";
import Courses from "./pages/Courses";
import Homepage from "./pages/Homepage";
import ONBOARDINGAPI from "./apis/OnboardingAPI";
import { ROUTES } from "./configs/routes";
import { Sidebar } from "./components/Sidebar";
import { Navbar } from "./components/Navbar";
import Login from "./pages/Login";
import Assessment from "./pages/Assessment/Assessment";

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
  const [drawerOpen, setDrawerOpen] = useState(true);
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
        const response = await ONBOARDINGAPI.getOnboardingStatus();
        if (response.role == Role.NO_ROLE) {
          navigate(ROUTES.NO_ROLE);
          return;
        }

        if (
          !response.telegram_status ||
          !response.mobile_verification_status ||
          !response.onboarding_status ||
          !response.onboarding_cv_status
        ) {
          navigate(ROUTES.ONBOARDING);
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

  return (
    <div className="flex flex-col w-full h-full items-center min-h-screen bg-blue-50">
      {userRole != Role.NO_ROLE && (
        <Navbar
          data={
            user
              ? {
                  photoURL: user.photoURL || undefined,
                  email: user.email || "",
                }
              : { email: "" }
          }
          handleLogout={() => {
            auth.signOut();
            localStorage.clear();
            setUserRole(Role.NO_ROLE);
          }}
          handleSidebarToggle={() => setDrawerOpen(!drawerOpen)}
          disabled={lockSidebarWhenNotOnboarding}
        />
      )}

      <Sidebar
        isSidebarOpen={drawerOpen}
        setIsSidebarOpen={setDrawerOpen}
        userRole={userRole}
      />

      <UserContext.Provider value={{ role: userRole }}>
        <Routes>
          <Route
            path={ROUTES.HOME}
            element={
              <LoginProtectedRoute>
                <Homepage />
              </LoginProtectedRoute>
            }
          />
          <Route
            path={ROUTES.LOGIN}
            element={user ? <Navigate to={ROUTES.HOME} /> : <Login />}
          />
          <Route
            path={ROUTES.COURSES}
            element={
              <LoginProtectedRoute>
                <Courses />
              </LoginProtectedRoute>
            }
          />

          <Route
            path={ROUTES.ONBOARDING}
            element={
              <LoginProtectedRoute>
                <OnboardingLms />
              </LoginProtectedRoute>
            }
          />
          <Route
            path={ROUTES.ASSESSMENT.HOME}
            element={
              <LoginProtectedRoute>
                <AssessmentHome />
              </LoginProtectedRoute>
            }
          />
          <Route
            path={ROUTES.ASSESSMENT.START}
            element={
              <LoginProtectedRoute>
                <Assessment />
              </LoginProtectedRoute>
            }
          />

          <Route
            path={ROUTES.MODULES}
            element={
              <LoginProtectedRoute>
                <Modules />
              </LoginProtectedRoute>
            }
          />
          <Route
            path={ROUTES.ASSESSMENT.RESULTS}
            element={
              <LoginProtectedRoute>
                <AssessmentsResults />
              </LoginProtectedRoute>
            }
          />
          <Route
            path={ROUTES.ASSESSMENT.REPORT}
            element={
              <LoginProtectedRoute>
                <AssessmentReport />
              </LoginProtectedRoute>
            }
          />
          <Route
            path={ROUTES.HELP_SUPPORT}
            element={
              <LoginProtectedRoute>
                <SupportPage />
              </LoginProtectedRoute>
            }
          />
          <Route
            path={ROUTES.BATCHES}
            element={
              <LoginProtectedRoute>
                <Batches />
              </LoginProtectedRoute>
            }
          />
          <Route
            path={ROUTES.RECORDINGS}
            element={
              <LoginProtectedRoute>
                <Recordings />
              </LoginProtectedRoute>
            }
          />
          <Route
            path={ROUTES.STUDENTS.LIST}
            element={
              <LoginProtectedRoute>
                <Students />
              </LoginProtectedRoute>
            }
          />
          <Route
            path={ROUTES.STUDENTS.DETAILS}
            element={
              <LoginProtectedRoute>
                <StudentDashboard />
              </LoginProtectedRoute>
            }
          />
          <Route
            path={ROUTES.NO_ROLE}
            element={
              <LoginProtectedRoute>
                <NoRole userData={user?.email || ""} />
              </LoginProtectedRoute>
            }
          />
        </Routes>
        <BugReport />
      </UserContext.Provider>
    </div>
  );
}

export default App;
