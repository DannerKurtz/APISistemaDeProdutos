// Importing all functions
import * as DeleteInDataBase from './Delete';
import * as CreateInDataBase from './Create';
import * as GetInDataBase from './Get';
import * as UpdateInDataBase from './Update';

// Combine all functions into a single variable
export const crudService = {
  ...DeleteInDataBase,
  ...CreateInDataBase,
  ...GetInDataBase,
  ...UpdateInDataBase,
};
