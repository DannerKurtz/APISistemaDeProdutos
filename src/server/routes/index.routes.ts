import { Router } from 'express';
import { userRouter } from './user.routes';
import { customerRouter } from './customer.routes';
import { rawMaterialRouter } from './rawMaterial.routes';
import { productRoutes } from './product.routes';
import { rawMaterialProductRelation } from './rawMaterialProductRelation.routes';
import { saleRouter } from './sales.routes';
import { productSaleRelationRouter } from './productSaleRelation.routes';

export const router = Router();

router.get('/api/', (req, res) => {
  res.send('Server Funcionando!');
});
userRouter(router);
customerRouter(router);
rawMaterialRouter(router);
productRoutes(router);
rawMaterialProductRelation(router);
saleRouter(router);
productSaleRelationRouter(router);
