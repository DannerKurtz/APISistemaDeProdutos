// Importing create, get, deleteSale, update
import * as create from './Create';
import * as get from './Get';
import * as deleteSale from './Delete';
import * as update from './Update';

// Exporting the variable responsible for combining the functions
export const saleController = {
  ...create,
  ...get,
  ...update,
  ...deleteSale,
};
