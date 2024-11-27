import * as create from './CreateProvider';
import * as get from './GetProvider';
import * as update from './UpdateProvider';

export const productProvider = {
  ...create,
  ...get,
  ...update,
};
