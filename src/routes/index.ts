import express from "express";
import userRouter from "./userRoute";
import boardRouter from "./boardRoute";

export default (app: express.Application) => {
  app.use("/api/auth", userRouter);
  app.use("/api/board", boardRouter);
};
