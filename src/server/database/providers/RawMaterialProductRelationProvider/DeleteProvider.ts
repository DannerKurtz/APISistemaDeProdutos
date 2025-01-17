// Necessary import
import { crudService } from '../../../shared/services/CRUD';
import {
  errorsCrudService,
  errorsProvider,
} from '../../../shared/services/messageErrors';

// Export of the function that deletes the relationship between products and raw materials
export const deleteRawMaterialProductRelation = async (
  id: string
): Promise<Boolean | Error> => {
  try {
    // Call to the function that deletes the relationship in the database
    const deletedRawMaterialProductionRelation: Boolean | Error =
      await crudService.deleteInDatabase(
        id,
        'RawMaterialProductRelations',
        errorsCrudService.deleteMessage('RawMaterialProductRelations')
      );

    // Returns the deletion or the error
    return deletedRawMaterialProductionRelation;
  } catch (error) {
    // Returns the error in case of an exception
    return new Error(
      errorsProvider.deleteMessage('RawMaterialProductRelations')
    );
  }
};
