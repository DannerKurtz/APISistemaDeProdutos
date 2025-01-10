// Importing the functions create, get, deleteRawMaterial, update
import * as create from './Create';
import * as get from './Get';
import * as deleteRawMaterial from './Delete';
import * as update from './Update';

// Exporting the variable that combines all the functions
export const rawMaterialController = {
  ...create,
  ...get,
  ...deleteRawMaterial,
  ...update,
};
