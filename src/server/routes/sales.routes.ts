import { Router } from 'express';
import { saleController } from '../controllers/SaleController';

export const saleRouter = (router: Router) => {
  router.post('/api/sale', saleController.create);
  router.get('/api/sale', saleController.get);
  router.delete('/api/sale/:id', saleController.deleteSale);
  router.put('/api/sale/:id', saleController.update);
};
