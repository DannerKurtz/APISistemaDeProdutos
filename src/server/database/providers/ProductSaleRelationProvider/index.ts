// Import of functions
import * as create from './CreateProvider';
import * as get from './GetProvider';
import * as deleteProductSaleRelation from './DeleteProvider';
import * as update from './UpdateProvider';

// Export of the variable that stores the functions
export const productSaleRelationProvider = {
  ...create,
  ...get,
  ...deleteProductSaleRelation,
  ...update,
};
