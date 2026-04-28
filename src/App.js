import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import UploadFood from "./pages/UploadFood";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";

// 🔒 Simple auth check
const isAuthenticated = () => {
  return localStorage.getItem("user") !== null;
};

// 🔒 Protected Route Wrapper
function ProtectedRoute({ children }) {
  return isAuthenticated() ? children : <Navigate to="/" />;
}

// 🔥 Layout with Navbar (only after login)
function Layout({ children }) {
  const location = useLocation();

  const hideNavbar = location.pathname === "/" || location.pathname === "/signup";

  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>

          {/* 🔐 AUTH */}
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* 🔒 PROTECTED */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/upload"
            element={
              <ProtectedRoute>
                <UploadFood />
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

          {/* 🚫 UNKNOWN ROUTES */}
          <Route path="*" element={<Navigate to="/" />} />

        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;