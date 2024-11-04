import { Router } from "express";
import { userRouter } from "./user.routes";

export const router = Router();

router.get("/api/", (req, res) => {
  res.send("Server Funcionando!");
});
userRouter(router);
