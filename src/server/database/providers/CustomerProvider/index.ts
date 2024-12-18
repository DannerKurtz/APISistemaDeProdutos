import * as create from "./CreateProvider";
import * as get from "./GetProvider";
import * as update from "./UpdateProvider";
import * as deleteClient from "./DeleteProvider";

export const clientsProvider = {
  ...create,
  ...get,
  ...update,
  ...deleteClient,
};
