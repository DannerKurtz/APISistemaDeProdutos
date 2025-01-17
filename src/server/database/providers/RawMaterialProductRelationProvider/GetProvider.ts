// Necessary import
import { crudService } from '../../../shared/services/CRUD';
import {
  errorsCrudService,
  errorsProvider,
} from '../../../shared/services/messageErrors';
import { IRawMaterialProductRelations } from '../../models/RawMaterialProductRelationsInterface';

// Export of the function that fetches the relationships between raw materials and products
export const get = async (
  id: string
): Promise<IRawMaterialProductRelations | Error> => {
  try {
    // Call to the crudService function responsible for fetching from the database
    const getRawMaterialProductRelation: IRawMaterialProductRelations | Error =
      await crudService.getInDatabase(
        { id },
        'RawMaterialProductRelations',
        errorsCrudService.getMessage('RawMaterialProductRelations')
      );

    // Returns the relationships or error
    return getRawMaterialProductRelation;
  } catch (error) {
    // Returns the error in case of an exception
    return new Error(errorsProvider.getMessage('RawMaterialProductRelations'));
  }
};
