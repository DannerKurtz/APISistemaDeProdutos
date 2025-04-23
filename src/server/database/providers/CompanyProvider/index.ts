// Importing the providers responsible for CRUD
import * as create from './CreateProvider';
// import * as get from "./GetProvider";
// import * as update from "./UpdateProvider";
// import * as deleteCustomer from "./DeleteProvider";

// Exporting the variable that combines the CRUD functions
export const companyProvider = {
  ...create,
  // ...get,
  // ...update,
  // ...deleteCustomer,
};
