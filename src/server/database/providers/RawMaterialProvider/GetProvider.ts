// Necessary imports
import { crudService } from '../../../shared/services/prismaHelpers/CRUD';
import {
  errorsCrudService,
  errorsProvider,
} from '../../../shared/services/messageErrors';
import { IRawMaterials } from '../../models/RawMaterialsInterface';

// Definition of the query interface
interface IQuery {
  id?: string;
  nome?: string | object;
}

// Export of the function that fetches the raw materials
export const get = async (query: IQuery): Promise<IRawMaterials | Error> => {
  try {
    // Call to the crudService function responsible for querying the database
    const getRawMaterials: IRawMaterials | Error =
      await crudService.getInDatabase(
        query,
        'RawMaterials',
        errorsCrudService.getMessage('RawMaterials')
      );

    // Returns the raw materials or error
    return getRawMaterials;
  } catch (error) {
    // Returns the error if there's an exception
    return new Error(errorsProvider.getMessage('RawMaterials'));
  }
};
