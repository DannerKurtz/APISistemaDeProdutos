// Import of the functions
import * as create from './CreateProvider';
import * as get from './GetProvider';
import * as deleteRawMaterial from './DeleteProvider';
import * as update from './UpdateProvider';

// Export of the variable that gathers all the functions
export const rawMaterialProvider = {
  ...create,
  ...get,
  ...deleteRawMaterial,
  ...update,
};
