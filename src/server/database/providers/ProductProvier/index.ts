import * as create from './CreateProvider';
import * as deleteProduct from './DeleteProvider';
import * as get from './GetProvider';
import * as update from './UpdateProvider';

export const productProvider = {
  ...create,
  ...get,
  ...update,
  ...deleteProduct
};
