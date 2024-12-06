import * as create from './CreateProvider';
import * as get from './GetProvider';
import * as update from './UpdateProvider';
import * as deleteRawMaterialProductRelation from './DeleteProvider';

export const rawMaterialProductRelationProvider = {
  ...create,
  ...get,
  ...update,
  ...deleteRawMaterialProductRelation,
};
