import { Router } from 'express';
import { productSaleRelationController } from '../controllers/ProductSaleRelationController';

export const productSaleRelationRouter = (router: Router) => {
  router.post('/api/productSaleRelation', productSaleRelationController.create);
};
