import * as create from './Create';
import * as get from './Get';
import * as deleteSale from './Delete';
import * as update from './Update';

export const saleController = {
  ...create,
  ...get,
  ...update,
  ...deleteSale,
};
