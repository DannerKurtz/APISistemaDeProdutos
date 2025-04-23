// Importing the create, get, update, and delete functions
import * as create from './Create';
// import * as get from './Get';
// import * as update from './Update';
// import * as deleteClient from './Delete';

// Exporting the variable responsible for combining all functions into a single call
export const companyController = {
  ...create,
  // ...get,
  // ...update,
  // ...deleteClient,
};
