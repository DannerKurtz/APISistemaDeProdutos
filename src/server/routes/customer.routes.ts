import { Router } from 'express';
import { customerController } from '../controllers/CustomerController';

export const customerRouter = (router: Router) => {
  router.post('/api/costumer', customerController.create);
  router.get('/api/costumer', customerController.get);
  router.put('/api/costumer/:id', customerController.update);
  router.delete('/api/costumer/:id', customerController.deleteCustomer);
};
