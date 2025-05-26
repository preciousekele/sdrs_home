import { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Preloader from "./pages/preloader/Preloader";
import VerifyEmail from "./pages/verifyEmail";
import CheckEmail from "./pages/confirmation/checkEmail";
import ConfirmEmail from "./pages/confirmation/ConfirmEmail";

const App = () => {
  return (
    <Router>
      <MainRoutes />
    </Router>
  );
};

const MainRoutes = () => {
  const location = useLocation();
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    const isFirstVisit = localStorage.getItem("preloaderShown") !== "true";
    if (isFirstVisit) {
      localStorage.setItem("preloaderShown", "true");
      const timer = setTimeout(() => setShowPreloader(false), 3000);
      return () => clearTimeout(timer);
    } else {
      setShowPreloader(false);
    }
  }, []);

  const allowedPaths = ["/", "/register", "/login"];
  const isInitialLoad = allowedPaths.includes(location.pathname) && showPreloader;

  return (
    <>
      {isInitialLoad ? (
        <Preloader />
      ) : (
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/check-email" element={<CheckEmail />} />
          <Route path="/confirm-email" element={<ConfirmEmail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      )}
    </>
  );
};

export default App;
