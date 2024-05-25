import express from "express";
import {
  userSignInController,
  userSignupController,
} from "../controller/user.js";

const userRouter = express.Router();

userRouter.post("/signup", userSignupController);
userRouter.post("/signin", userSignInController);

export default userRouter;
