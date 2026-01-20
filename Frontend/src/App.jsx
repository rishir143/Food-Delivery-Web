import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/signup";
import ForgotPassword from "./pages/ForgotPassword";
import useGetCurrentUser from "../hooks/useGetCurrentUser";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import useGetCity from "../hooks/useGetCity";
export const serverUrl = "http://localhost:8000";

const App = () => {
  useGetCurrentUser();
  useGetCity();
  const { userData } = useSelector((state) => state.user);
  return (
    <div>
      <Routes>
        <Route
          path="/signup"
          element={!userData ? <SignUp /> : <Navigate to={"/"} />}
        />
        <Route
          path="/signin"
          element={!userData ? <SignIn /> : <Navigate to={"/"} />}
        />
        <Route
          path="/forgot-password"
          element={!userData ? <ForgotPassword /> : <Navigate to={"/"} />}
        />
        <Route
          path="/"
          element={userData ? <Home /> : <Navigate to={"/signin"} />}
        />
      </Routes>
    </div>
  );
};

export default App;
