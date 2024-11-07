import * as create from "./CreateProvider";
import * as get from "./GetProvider";
import * as deleteRawMaterial from "./DeleteProvider";
import * as update from "./UpdateProvider";

export const rawMaterialProvider = {
  ...create,
  ...get,
  ...deleteRawMaterial,
  ...update,
};
