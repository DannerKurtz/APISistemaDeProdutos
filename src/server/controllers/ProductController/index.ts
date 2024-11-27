import * as create from './Create';
import * as get from './Get';
import * as update from './Update';

export const productController = {
  ...create,
  ...get,
  ...update,
};
