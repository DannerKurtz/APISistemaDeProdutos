import * as create from './Create';
import * as get from './Get';
import * as deleteProductSaleRelation from './Delete';
import * as update from './Update';

export const productSaleRelationController = {
  ...create,
  ...get,
  ...deleteProductSaleRelation,
  ...update,
};
