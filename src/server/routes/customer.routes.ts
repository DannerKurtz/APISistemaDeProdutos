import { Router } from 'express';
import { customerController } from '../controllers/CustomerController';

export const customerRouter = (router: Router) => {
  router.post('/api/client', customerController.create);
  router.get('/api/client', customerController.get);
  router.put('/api/client/:id', customerController.update);
  router.delete('/api/client/:id', customerController.deleteCustomer);
};
