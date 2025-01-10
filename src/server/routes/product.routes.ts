// Importing the express router and the customerController responsible for the method controllers
import { Router } from 'express';
import { productController } from '../controllers/ProductController';

// Defining and exporting the product route, receiving the router parameter of type Router from Express
export const productRoutes = (router: Router) => {
  router.post('/api/product', productController.create); // POST route responsible for creating products
  router.get('/api/product', productController.get); // GET route responsible for fetching products
  router.put('/api/product/:id', productController.update); // PUT route responsible for updating products
  router.delete('/api/product/:id', productController.deleteProduct); // DELETE route responsible for deleting a product
};
