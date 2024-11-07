import * as create from "./Create";
import * as get from "./Get";
import * as deleteRawMaterial from "./Delete";
import * as update from "./Update";

export const rawMaterialController = {
  ...create,
  ...get,
  ...deleteRawMaterial,
  ...update,
};
