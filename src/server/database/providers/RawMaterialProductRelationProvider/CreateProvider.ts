// Necessary imports
import { crudService } from '../../../shared/services/prismaHelpers/CRUD';
import {
  errorsCrudService,
  errorsProvider,
} from '../../../shared/services/messageErrors';
import {
  IRawMaterialProductRelations,
  IRawMaterialProductRelationsWithoutId,
} from '../../models/RawMaterialProductRelationsInterface';

// Export of the function responsible for creating the product and raw material relationship
export const create = async (
  data: IRawMaterialProductRelationsWithoutId
): Promise<IRawMaterialProductRelations | Error> => {
  try {
    // Call to the crudService responsible for creating the relationship in the database
    const newRawMaterialProductRelation: IRawMaterialProductRelations | Error =
      await crudService.createInDatabase(
        data,
        'RawMaterialProductRelations',
        errorsCrudService.createMessage('RawMaterialProductRelations')
      );

    // Returns the created relationship or an error
    return newRawMaterialProductRelation;
  } catch (error) {
    return new Error(
      // Returns the error in case of an exception
      errorsProvider.createMessage('RawMaterialProductRelations')
    );
  }
};
