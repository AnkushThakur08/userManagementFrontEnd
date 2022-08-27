import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index element={<StatsPage />} />
          <Route path="Chat" element={<ChatPage />} />
          <Route path="Friend" element={<FriendsPage />} />
          <Route path="Notification" element={<NotificationPage />} />
          <Route path="Profile" element={<ProfilePage />} />
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
