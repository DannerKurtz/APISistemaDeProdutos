// Importing the express router and the customerController responsible for the method controllers
import { Router } from 'express';
import { productSaleRelationController } from '../controllers/ProductSaleRelationController';

//Defining and exporting the sales and product relation route, receiving the router parameter of type Router from Express
export const productSaleRelationRouter = (router: Router) => {
  router.post('/api/product-sale-relation', productSaleRelationController.create); // POST route responsible for creating the sales and product relation
  router.get('/api/product-sale-relation', productSaleRelationController.get); // GET route responsible for fetching the sales and product relation
  router.put(
    '/api/product-sale-relation/:id',
    productSaleRelationController.update
  ); // PUT route responsible for updating the sales and product relation
  router.delete(
    '/api/product-sale-relation/:id',
    productSaleRelationController.deleteProductSaleRelation
  ); // DELETE route responsible for deleting a sales and product relation
};
