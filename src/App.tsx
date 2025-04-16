import "./App.css";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { auth } from "./configs/firebase";
import { useEffect, useState } from "react";
import { User } from "firebase/auth";
import { createContext } from "react";
// import BugReport from "./components/BugReport";
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
import { NavItem, Role, UserContextType } from "./types/app";
import AdvancedBugReport from "./components/Report/AdvancedBugReport";
import {
  Book,
  ChartColumnDecreasing,
  House,
  Info,
  UsersRound,
  Video,
  MessageCircleQuestion,
} from "lucide-react";
import Feedback from "./pages/Feedback/Feedback";

import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import AddStudent from "./pages/Student/AddStudent";
import { Toaster } from "./components/ui/sonner";
import CourseForm from "./pages/CourseForm";
import CourseEdit from "./pages/CourseEdit";
import ModuleForm from "./pages/ModuleForm";
import ModuleEdit from "./pages/ModuleEdit";
import VideoForm from "./pages/VideoForm";
import DocumentForm from "./pages/DocumentForm";

export const UserContext = createContext<UserContextType>({
  role: Role.NO_ROLE,
  userName: "",
});

function App() {
  const [user, setUser] = useState<User | null>();
  const [drawerOpen, setDrawerOpen] = useState(true);
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState<Role>(Role.NO_ROLE);
  const [userName, setUserName] = useState("");
  const [lockSidebarWhenNotOnboarding, setLockSidebarWhenNotOnboarding] =
    useState(false);

  const { toast } = useToast();

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

        if (response.pending_forms) {
          navigate(ROUTES.FEEDBACK);
          toast({
            className:
              "bottom-0 left-0 flex fixed md:max-w-[420px] md:bottom-4 md:left-4",
            variant: "destructive",
            title: "Feedbacks Pending!",
            description: "Please submit your feedbacks before proceeding.",
            action: <ToastAction altText="Sure">Sure</ToastAction>,
          });
          return;
        }

        setUserRole(response.role);
        setUserName(response.user_name);
      } catch (error) {
        console.error("Error checking onboarding status:", error);
      }
    };
    if (user) checkOnboardingStatus();
  }, [user]);

  const navItems: NavItem[] = [
    {
      icon: House,
      label: "Home",
      href: ROUTES.HOME,
      roles: [Role.STUDENT, Role.LECTURER, Role.COURSE_PROVIDER_ADMIN],
    },
    {
      icon: Book,
      label: "Courses",
      href: ROUTES.COURSES,
      roles: [Role.STUDENT, Role.LECTURER, Role.COURSE_PROVIDER_ADMIN],
    },
    {
      icon: ChartColumnDecreasing,
      label: "Assessments Results",
      href: ROUTES.ASSESSMENT.RESULTS,
      roles: [Role.STUDENT],
    },
    {
      icon: UsersRound,
      label: "Students",
      href: ROUTES.STUDENTS.LIST,
      roles: [Role.LECTURER, Role.COURSE_PROVIDER_ADMIN],
    },
    {
      icon: Video,
      label: "Recordings",
      href: ROUTES.RECORDINGS,
      roles: [Role.STUDENT, Role.LECTURER, Role.COURSE_PROVIDER_ADMIN],
    },
    {
      icon: Info,
      label: "Help & Support",
      href: ROUTES.HELP_SUPPORT,
      roles: [Role.STUDENT, Role.LECTURER, Role.COURSE_PROVIDER_ADMIN],
    },
    {
      icon: MessageCircleQuestion,
      label: "Feedback",
      href: ROUTES.FEEDBACK,
      roles: [Role.STUDENT],
    },
  ];

  // Filter navItems based on user role
  const filteredNavItems = navItems.filter(
    (item) => !item.roles || item.roles.includes(userRole)
  );

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
          role={userRole}
          handleSidebarToggle={() => setDrawerOpen(!drawerOpen)}
          disabled={lockSidebarWhenNotOnboarding}
        />
      )}

      {userRole != Role.NO_ROLE && (
        <Sidebar
          isSidebarOpen={drawerOpen}
          setIsSidebarOpen={setDrawerOpen}
          navItems={filteredNavItems}
        />
      )}

      <UserContext.Provider
        value={{ role: userRole, userName: userName || "" }}
      >
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
            path={ROUTES.COURSE_FORM}
            element={
              <LoginProtectedRoute>
                <CourseForm />
              </LoginProtectedRoute>
            }
          />
          <Route
            path={ROUTES.COURSE_EDIT}
            element={
              <LoginProtectedRoute>
                <CourseEdit />
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
            path={ROUTES.MODULE_FORM}
            element={
              <LoginProtectedRoute>
                <ModuleForm />
              </LoginProtectedRoute>
            }
          />
          <Route
            path={ROUTES.MODULE_EDIT}
            element={
              <LoginProtectedRoute>
                <ModuleEdit />
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
            path={ROUTES.FEEDBACK}
            element={
              <LoginProtectedRoute>
                <Feedback />
              </LoginProtectedRoute>
            }
          />
          <Route
            path={ROUTES.VIDEO_FORM}
            element={
              <LoginProtectedRoute>
                <VideoForm />
              </LoginProtectedRoute>
            }
          />
          <Route
            path={ROUTES.DOCUMENT_FORM}
            element={
              <LoginProtectedRoute>
                <DocumentForm />
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
          <Route
            path={ROUTES.STUDENTS.ADD}
            element={
              <LoginProtectedRoute>
                <AddStudent />
              </LoginProtectedRoute>
            }
          />
        </Routes>
        <AdvancedBugReport />
      </UserContext.Provider>

      <Toaster />
    </div>
  );
}

export default App;
