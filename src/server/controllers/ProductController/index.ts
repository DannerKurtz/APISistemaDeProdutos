// Importing create, deleteProduct, get, update
import * as create from './Create';
import * as deleteProduct from './Delete';
import * as get from './Get';
import * as update from './Update';

// Exporting the productController to combine all functions
export const productController = {
  ...create,
  ...get,
  ...update,
  ...deleteProduct,
};
