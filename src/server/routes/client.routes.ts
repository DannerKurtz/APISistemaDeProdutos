import { Router } from "express";
import { clientsController } from "../controllers/ClientsController";

export const clientRouter = (router: Router) => {
  router.post("/api/client", clientsController.create);
  router.get("/api/client", clientsController.get);
  router.put("/api/client/:id", clientsController.update);
  router.delete("/api/client/:id", clientsController.deleteClient);
};
