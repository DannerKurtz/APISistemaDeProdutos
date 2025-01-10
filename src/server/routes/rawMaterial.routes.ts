// Importing the express router and the customerController responsible for the method controllers
import { rawMaterialController } from "../controllers/RawMaterialController";
import { Router } from "express";

// Defining and exporting the raw material route, receiving the router parameter of type Router from Express
export const rawMaterialRouter = (router: Router) => {
  router.post('/api/raw-material', rawMaterialController.create); // POST route responsible for creating raw materials
  router.get('/api/raw-material', rawMaterialController.get); // GET route responsible for fetching raw materials
  router.put('/api/raw-material/:id', rawMaterialController.update); // PUT route responsible for updating raw materials
  router.delete(
    '/api/raw-material/:id',
    rawMaterialController.deleteRawMaterial
  ); // DELETE route responsible for deleting a raw material
};
