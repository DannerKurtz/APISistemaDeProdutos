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

// Export of the function that updates the relationship between product and raw material
export const update = async (
  id: string,
  data: IRawMaterialProductRelationsWithoutId
): Promise<IRawMaterialProductRelations | Error> => {
  try {
    // Call to the crudService function responsible for updating in the database
    const updateRawMaterialProductRelation:
      | IRawMaterialProductRelations
      | Error = await crudService.updateInDatabase(
      id,
      data,
      'RawMaterialProductRelations',
      errorsCrudService.updateMessage('RawMaterialProductRelations')
    );
    // Returns the updated relationship or the error
    return updateRawMaterialProductRelation;
  } catch (error) {
    // Returns the error in case of an exception
    return new Error(
      errorsProvider.updateMessage('RawMaterialProductRelations')
    );
  }
};
