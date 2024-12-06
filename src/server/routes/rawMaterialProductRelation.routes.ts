import { Router } from 'express';
import { rawMaterialProductRelationController } from '../controllers/RawMaterialProductRelationController';

export const rawMaterialProductRelation = (router: Router) => {
  router.get(
    '/api/RawMaterialProductRelation',
    rawMaterialProductRelationController.get
  );
  router.post(
    '/api/RawMaterialProductRelation',
    rawMaterialProductRelationController.create
  );
  router.put(
    '/api/RawMaterialProductRelation/:id',
    rawMaterialProductRelationController.update
  );
  router.delete(
    '/api/RawMaterialProductRelation/:id',
    rawMaterialProductRelationController.deleteRawMaterialProductRelation
  );
};
