import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// React-Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components
import { NavBar } from "./components";

// Normal Pages
import {
  LandingPage,
  ErrorPage,
  VerifyPage,
  RegistrationEmailPage,
  RegistrationPhonePage,
  LoginEmailPage,
  LoginPhonePage,
  VerifyLoginOTPPage,
  ForgetMailPasswordPage,
  CreateNewMailPasswordPage,
  ForgetPhonePasswordPage,
  CreateNewPhonePasswordPage,
  AcceptInvitePage,
} from "./pages";

// Shared Pages
import {
  ChatPage,
  FriendsPage,
  NotificationPage,
  ProfilePage,
  StatsPage,
} from "./pages/Dashboard";

// Protected Routes
import PrivateRoute from "./helper/PrivateRoutes";
import { isAuthenticated } from "./helper/ApiCall";

const App = () => {
  return (
    <BrowserRouter>
      {console.log(Boolean(isAuthenticated()))}
      <Routes>
        <Route
          path="/"
          element={isAuthenticated() ? <NavBar /> : <Navigate to="/home" />}
        >
          <Route
            index
            element={
              isAuthenticated() ? <StatsPage /> : <Navigate to="/home" />
            }
          />
          <Route
            path="Chat"
            element={isAuthenticated() ? <ChatPage /> : <Navigate to="/home" />}
          />
          <Route
            path="Friend"
            element={
              isAuthenticated() ? <FriendsPage /> : <Navigate to="/home" />
            }
          />
          <Route
            path="Notification"
            element={
              isAuthenticated() ? <NotificationPage /> : <Navigate to="/home" />
            }
          />
          <Route
            path="Profile"
            element={
              isAuthenticated() ? <ProfilePage /> : <Navigate to="/home" />
            }
          />
        </Route>

        <Route path="/home" element={<LandingPage />} />
        <Route path="/Verify" element={<VerifyPage />} />
        <Route path="/Registration" element={<RegistrationEmailPage />} />
        <Route path="/Phone" element={<RegistrationPhonePage />} />
        <Route path="/Login" element={<LoginEmailPage />} />
        <Route path="/LoginNumber" element={<LoginPhonePage />} />
        <Route path="/verifyLogin" element={<VerifyLoginOTPPage />} />

        {/* Forget Password mail */}
        <Route path="/resetPassword" element={<ForgetMailPasswordPage />} />
        <Route path="/reset/:token" element={<CreateNewMailPasswordPage />} />

        {/* Forget Passoword Number */}
        <Route path="/forgetPhone" element={<ForgetPhonePasswordPage />} />
        <Route path="/resetPhone" element={<CreateNewPhonePasswordPage />} />
        <Route path="/invite" element={<AcceptInvitePage />} />

        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <ToastContainer position="top-center" />
    </BrowserRouter>
  );
};

export default App;
