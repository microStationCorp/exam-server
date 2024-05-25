import "dotenv/config";
import cookieParser from "cookie-parser";
import express, { json, urlencoded } from "express";
import postsRouter from "./router/posts.js";
import userRouter from "./router/user.js";

export const app = express();

//middleware
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());

//routes
app.get("/", (req, res) => {
  res.send("home page");
});
app.use("/posts", postsRouter);
app.use("/user", userRouter);

//listener
app.listen(process.env.PORT, () => {
  console.log("server start");
});
