import * as DeleteInDataBase from "./Delete";
import * as CreateInDataBase from "./Create";
import * as GetInDataBase from "./Get";
import * as UpdateInDataBase from "./Update";

export const crudService = {
  ...DeleteInDataBase,
  ...CreateInDataBase,
  ...GetInDataBase,
  ...UpdateInDataBase,
};
