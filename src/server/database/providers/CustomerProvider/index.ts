import * as create from "./CreateProvider";
import * as get from "./GetProvider";
import * as update from "./UpdateProvider";
import * as deleteCustomer from "./DeleteProvider";

export const customerProvider = {
  ...create,
  ...get,
  ...update,
  ...deleteCustomer,
};
