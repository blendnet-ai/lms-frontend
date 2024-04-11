import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import LearningWrapper from "./pages/Learning";
import VideoHistory from "./pages/VideoHistory";
import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
