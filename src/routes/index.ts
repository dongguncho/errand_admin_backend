import express from "express";
import userRouter from "./userRoute";
import boardRouter from "./boardRoute";
import boardCmtRouter from "./boardCmtRoute";
import cuponRoute from "./cuponRoute";

export default (app: express.Application) => {
  app.use("/api/auth", userRouter);
  app.use("/api/board", boardRouter);
  app.use("/api/boardCmt", boardCmtRouter);
  app.use("/api/cupon", cuponRoute);
};
