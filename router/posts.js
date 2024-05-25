import express from "express";
import { postsController } from "../controller/posts.js";

const postsRouter = express.Router();

postsRouter.get("/", postsController);

export default postsRouter;
