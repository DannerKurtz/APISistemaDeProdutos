// Necessary imports
import { crudService } from '../../../shared/services/prismaHelpers/CRUD';
import {
  errorsCrudService,
  errorsProvider,
} from '../../../shared/services/messageErrors';

// Export of the function that deletes the raw material
export const deleteRawMaterial = async (
  id: string
): Promise<Boolean | Error> => {
  try {
    // Call to the crudService function that deletes the raw material in the database
    const deletedRawMaterial: Boolean | Error =
      await crudService.deleteInDatabase(
        id,
        'RawMaterials',
        errorsCrudService.deleteMessage('RawMaterials')
      );

    // Returns whether it was deleted or if there was an error
    return deletedRawMaterial;
  } catch (error) {
    // Returns the error in case of an exception
    return new Error(errorsProvider.deleteMessage('RawMaterials'));
  }
};
