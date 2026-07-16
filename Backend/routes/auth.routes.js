import express from "express";
import {
  googleAuth,
  googleAuthlogin,
  resetPassword,
  sendOtp,
  signIn,
  signOut,
  signUp,
  verifyOtp,
} from "../Controllers/auth.controller.js";
const authRouter = express.Router();

authRouter.post("/signup", signUp);
authRouter.post("/signin", signIn);
authRouter.get("/signout", signOut);
authRouter.post("/send-otp", sendOtp);
authRouter.post("/verify-otp", verifyOtp);
authRouter.post("/reset-password", resetPassword);
authRouter.post("/google-auth", googleAuth);
authRouter.post("/google-signin", googleAuthlogin);

export default authRouter;
