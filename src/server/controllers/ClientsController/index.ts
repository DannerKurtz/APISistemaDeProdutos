import * as create from "./Create";
import * as get from "./Get";
import * as update from "./Update";
import * as deleteClient from "./Delete";

export const clientsController = {
  ...create,
  ...get,
  ...update,
  ...deleteClient,
};
