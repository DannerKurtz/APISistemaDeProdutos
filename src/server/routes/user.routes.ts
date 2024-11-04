import { userController } from "../controllers/UserController";
import { Router } from "express";

export const userRouter = (router: Router) => {
  router.post("/api/user", userController.create);
  router.get("/api/user", userController.get);
  router.put("/api/user/:id", userController.update);
  router.delete("/api/user/:id", userController.deleteUser);
};
