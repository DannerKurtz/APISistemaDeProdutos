// Import create, update, get, delete user
import * as update from './Update';
import * as create from './Create';
import * as get from './Get';
import * as userDelete from './Delete';

// Variable responsible for combining the functions
export const userController = {
  ...create,
  ...get,
  ...update,
  ...userDelete,
};
