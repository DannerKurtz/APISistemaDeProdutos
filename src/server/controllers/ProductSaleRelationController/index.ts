import * as create from './Create';
import * as get from './Get';
import * as deleteProductSaleRelation from './Delete';

export const productSaleRelationController = {
  ...create,
  ...get,
  ...deleteProductSaleRelation,
};
