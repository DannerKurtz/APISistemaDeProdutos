// Importing the express router and the customerController responsible for the method controllers
import { Router } from 'express';
import { rawMaterialProductRelationController } from '../controllers/RawMaterialProductRelationController';

// Defining and exporting the relation between raw materials and products route, receiving the router parameter of type Router from Express
export const rawMaterialProductRelation = (router: Router) => {
  router.post(
    '/api/raw-material-product-relation',
    rawMaterialProductRelationController.create
  ); // POST route responsible for creating the relation between raw materials and products
  router.get(
    '/api/raw-material-product-relation',
    rawMaterialProductRelationController.get
  ); // GET route responsible for fetching the relation between raw materials and products
  router.put(
    '/api/raw-material-product-relation/:id',
    rawMaterialProductRelationController.update
  ); // PUT route responsible for updating the relation between raw materials and products
  router.delete(
    '/api/raw-material-product-relation/:id',
    rawMaterialProductRelationController.deleteRawMaterialProductRelation
  ); // DELETE route responsible for deleting a relation between raw materials and products
};
