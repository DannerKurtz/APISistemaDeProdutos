import * as create from './Create';
import * as get from './Get';
import * as update from './Update';
import * as deleteRawMaterialProductRelation from './Delete';

export const rawMaterialProductRelationController = {
  ...create,
  ...get,
  ...update,
  ...deleteRawMaterialProductRelation,
};
