import * as create from './CreateProvider';
import * as get from './GetProvider';
import * as deleteProductSaleRelation from './DeleteProvider';
import * as update from './UpdateProvider';

export const productSaleRelationProvider = {
  ...create,
  ...get,
  ...deleteProductSaleRelation,
  ...update,
};
