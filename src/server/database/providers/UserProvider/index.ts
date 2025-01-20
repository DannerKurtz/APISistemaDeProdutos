// Importing the functions
import * as create from './CreateProvider';
import * as get from './GetProvider';
import * as update from './UpdateProvider';
import * as deleteUser from './DeleteProvider';

// Merging the functions into a single variable
export const userProvider = {
  ...create,
  ...get,
  ...update,
  ...deleteUser,
};
