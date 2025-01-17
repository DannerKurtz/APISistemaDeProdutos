// Import of the functions from the product provider
import * as create from './CreateProvider';
import * as deleteProduct from './DeleteProvider';
import * as get from './GetProvider';
import * as update from './UpdateProvider';

// Export of the variable that contains the functions
export const productProvider = {
  ...create,
  ...get,
  ...update,
  ...deleteProduct,
};
