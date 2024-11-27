import { Router } from 'express';
import { productController } from '../controllers/ProductController';

export const productRoutes = (router: Router) => {
  router.post('/api/product', productController.create);
  router.get('/api/product', productController.get);
  router.put('/api/product/:id', productController.update);
};
