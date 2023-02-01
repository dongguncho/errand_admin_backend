import express from "express";
import userRouter from "./userRouter";
import boardRouter from "./boardRouter";

export default (app: express.Application) => {
  app.use("/api/auth", userRouter);
  app.use("/api/board", boardRouter);
};
