import * as create from './CreateProvider';
import * as get from './GetProvider';
import * as deleteProductSaleRelation from './DeleteProvider';

export const productSaleRelationProvider = {
  ...create,
  ...get,
  ...deleteProductSaleRelation,
};
