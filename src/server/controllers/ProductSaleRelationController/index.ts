// Importing the functions create, get, deleteProductSaleRelation, update
import * as create from './Create';
import * as get from './Get';
import * as deleteProductSaleRelation from './Delete';
import * as update from './Update';

// Exporting the variable that combines all the functions
export const productSaleRelationController = {
  ...create,
  ...get,
  ...deleteProductSaleRelation,
  ...update,
};
