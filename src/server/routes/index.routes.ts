// Importing the Router from express
import { Router } from 'express';

// Importing the functions that handle the CRUD operations for each route
import { userRouter } from './user.routes';
import { customerRouter } from './customer.routes';
import { rawMaterialRouter } from './rawMaterial.routes';
import { productRoutes } from './product.routes';
import { rawMaterialProductRelation } from './rawMaterialProductRelation.routes';
import { saleRouter } from './sales.routes';
import { productSaleRelationRouter } from './productSaleRelation.routes';

// Defining and exporting the router variable that will hold the Router from express
export const router = Router();

// Calling the GET method to test if the API is running, at the /api/ route
router.get('/api/', (req, res) => {
  res.send('Server Funcionando!');
});

// Invoking the functions responsible for CRUD operations and passing the router as a parameter
userRouter(router);
customerRouter(router);
rawMaterialRouter(router);
productRoutes(router);
rawMaterialProductRelation(router);
saleRouter(router);
productSaleRelationRouter(router);
