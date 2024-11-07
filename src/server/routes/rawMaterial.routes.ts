import { rawMaterialController } from "../controllers/RawMaterialController";
import { Router } from "express";

export const rawMaterialRouter = (router: Router) => {
  router.post("/api/rawMaterial", rawMaterialController.create);
  router.get("/api/rawMaterial", rawMaterialController.get);
  router.put("/api/rawMaterial/:id", rawMaterialController.update);
  router.delete(
    "/api/rawMaterial/:id",
    rawMaterialController.deleteRawMaterial
  );
};
