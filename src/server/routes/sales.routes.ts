// Importing the express router and the customerController responsible for the method controllers
import { Router } from 'express';
import { saleController } from '../controllers/SaleController';

// Defining and exporting the sales route, receiving the router parameter of type Router from Express
export const saleRouter = (router: Router) => {
  router.post('/api/sale', saleController.create); // POST route responsible for creating sales
  router.get('/api/sale', saleController.get); // GET route responsible for fetching sales
  router.put('/api/sale/:id', saleController.update); // PUT route responsible for updating sales
  router.delete('/api/sale/:id', saleController.deleteSale); // DELETE route responsible for deleting a sale
};
