import * as update from "./Update";
import * as create from "./Create";
import * as get from "./Get";
import * as userDelete from "./Delete";

export const userController = {
  ...create,
  ...get,
  ...update,
  ...userDelete,
};
