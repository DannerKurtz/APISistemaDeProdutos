// Importing functions
import * as create from './CreateProvider';
import * as get from './GetProvider';
import * as deleteSale from './DeleteProvider';
import * as update from './UpdateProvider';

// Merging functions into a single variable
export const saleProvider = {
  ...create,
  ...get,
  ...deleteSale,
  ...update,
};
