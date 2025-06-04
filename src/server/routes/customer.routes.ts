// Importing the express router and the customerController responsible for the method controllers
import { Router } from 'express';
import { customerController } from '../controllers/CustomerController';
import { ensureAuthenticated } from '../shared/middlewares/EnsureAuthenticated';

// Defining and exporting the customer route, receiving the router parameter of type Router from Express
export const customerRouter = (router: Router) => {
  router.post('/api/customer', ensureAuthenticated, customerController.create); // POST route responsible for creating customers
  router.get('/api/customer', ensureAuthenticated, customerController.get); // GET route responsible for fetching customers
  router.put('/api/customer/:id', customerController.update); //PUT route responsible for updating customers
  router.delete('/api/customer/:id', customerController.deleteCustomer); //DELETE route responsible for deleting a customer
};
