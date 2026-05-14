import { createBrowserRouter, Navigate } from "react-router-dom";

import Login from "./pages/auth/Login";
import AuthLayout from "./components/layout/AuthLayout";
import SignUp from "./pages/auth/SignUp";
import { OtpVerify } from "./pages/auth/OtpVerify";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/auth/login" />,
  },
  {
    path: "auth",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="login" />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <SignUp />,
      },
      {
        path: "otp-verify",
        element: <OtpVerify />,
      },
    ],
  },
]);

export default router;
