// Import of functions
import * as create from './CreateProvider';
import * as get from './GetProvider';
import * as update from './UpdateProvider';
import * as deleteRawMaterialProductRelation from './DeleteProvider';

// Export of the variable that stores all functions
export const rawMaterialProductRelationProvider = {
  ...create,
  ...get,
  ...update,
  ...deleteRawMaterialProductRelation,
};
