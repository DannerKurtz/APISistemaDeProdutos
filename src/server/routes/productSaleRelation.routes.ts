import { Router } from 'express';
import { productSaleRelationController } from '../controllers/ProductSaleRelationController';

export const productSaleRelationRouter = (router: Router) => {
  router.post('/api/productSaleRelation', productSaleRelationController.create);
  router.get('/api/productSaleRelation', productSaleRelationController.get);
  router.delete(
    '/api/productSaleRelation/:id',
    productSaleRelationController.deleteProductSaleRelation
  );
  router.put(
    '/api/productSaleRelation/:id',
    productSaleRelationController.update
  );
};
