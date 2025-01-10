// Importing the functions create, get, update, deleteRawMaterialProductRelation
import * as create from './Create';
import * as get from './Get';
import * as update from './Update';
import * as deleteRawMaterialProductRelation from './Delete';

// Exporting the variable that contains all the functions
export const rawMaterialProductRelationController = {
  ...create,
  ...get,
  ...update,
  ...deleteRawMaterialProductRelation,
};
