import { Router } from "express";
import { userRouter } from "./user.routes";
import { clientRouter } from "./client.routes";
import { rawMaterialRouter } from "./rawMaterial.routes";

export const router = Router();

router.get("/api/", (req, res) => {
  res.send("Server Funcionando!");
});
userRouter(router);
clientRouter(router);
rawMaterialRouter(router);
