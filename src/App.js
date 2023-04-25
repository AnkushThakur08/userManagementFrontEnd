import React, { useState, useEffect } from "react";
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
  InvitiesPage,
  NotificationPage,
  ProfilePage,
  StatsPage,
  SendNotificationPage,
  ChatPage2,
  FirebaseLogin,
  FirebaseRegister,
  OnetoOneChat,
} from "./pages/Dashboard";

// Protected Routes
import { isAuthenticated, isAuthenticated2 } from "./helper/ApiCall";

// ChatContext
import AuthProvider from "./pages/Dashboard/Chat/ChatContext/auth";
import Protected from "./components/Protected";
import ProtectedJWT from "./components/ProtectedJWT";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        {console.log("CHECK!!!!", Boolean(isAuthenticated()))}
        <Routes>
          <Route
            path="/"
            element={isAuthenticated() ? <NavBar /> : <Navigate to="/home" />}
          >
            {/* <Route path="/" element={<ProtectedJWT Cmp={NavBar} />}> */}
            <Route
              index
              element={
                isAuthenticated() ? <StatsPage /> : <Navigate to="/home" />
              }
            />
            <Route
              path="Chat"
              element={
                isAuthenticated() ? <ChatPage /> : <Navigate to="/home" />
              }
            />
            <Route
              path="Friend"
              element={
                isAuthenticated() ? <FriendsPage /> : <Navigate to="/home" />
              }
            />
            <Route
              path="Invites"
              element={
                isAuthenticated() ? <InvitiesPage /> : <Navigate to="/home" />
              }
            />
            <Route
              path="Notification"
              element={
                isAuthenticated() ? (
                  <NotificationPage />
                ) : (
                  <Navigate to="/home" />
                )
              }
            />
            <Route
              path="Profile"
              element={
                isAuthenticated() ? <ProfilePage /> : <Navigate to="/home" />
              }
            />
            <Route
              path="Chat2"
              element={
                isAuthenticated() ? <ChatPage2 /> : <Navigate to="/home" />
              }
            />
            <Route
              path="OnetoOneChat"
              element={
                isAuthenticated2() ? <OnetoOneChat /> : <Navigate to="/chat2" />
              }
            />

            {/* <Route
              path="OnetoOneChat"
              element={<Protected Cmp={OnetoOneChat} />}
            /> */}
          </Route>

          {/* TODO: */}

          {/* <Route path="/" element={<NavBar />}>
          <Route index element={<StatsPage />} />
          <Route path="Chat" element={<ChatPage />} />
          <Route path="Friend" element={<FriendsPage />} />

          <Route path="Invites" element={<InvitiesPage />} />

          <Route path="Notification" element={<NotificationPage />} />
          <Route path="Profile" element={<ProfilePage />} />
        </Route> */}

          {/* TODO: */}

          <Route path="/firebaseLogin" element={<FirebaseLogin />} />
          <Route path="/firebaseRegister" element={<FirebaseRegister />} />
          {/*  */}
          <Route path="/home" element={<LandingPage />} />
          <Route path="/Verify" element={<VerifyPage />} />
          <Route path="/Registration" element={<RegistrationEmailPage />} />
          <Route path="/Phone" element={<RegistrationPhonePage />} />
          <Route path="/Login" element={<LoginEmailPage />} />
          <Route path="/LoginNumber" element={<LoginPhonePage />} />
          <Route path="/verifyLogin" element={<VerifyLoginOTPPage />} />

          {/* Forget Password mail */}
          <Route path="/resetPassword" element={<ForgetMailPasswordPage />} />
          <Route
            path="/reset/:token/:id"
            element={<CreateNewMailPasswordPage />}
          />

          {/* Forget Passoword Number */}
          <Route path="/forgetPhone" element={<ForgetPhonePasswordPage />} />
          <Route path="/resetPhone" element={<CreateNewPhonePasswordPage />} />
          <Route path="/invite/:token/:id" element={<AcceptInvitePage />} />

          <Route path="*" element={<ErrorPage />} />

          {/* {<Route
            path="sendNotification"
            element={
              isAuthenticated() ? (
                <SendNotificationPage />
              ) : (
                <Navigate to="/home" />
              )
            }
          />} */}
        </Routes>
        <ToastContainer position="top-center" />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
