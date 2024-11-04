import * as create from "./CreateProvider";
import * as get from "./GetProvider";
import * as update from "./UpdateProvider";
import * as deleteUser from "./DeleteProvider";

export const userProvider = {
  ...create,
  ...get,
  ...update,
  ...deleteUser,
};
