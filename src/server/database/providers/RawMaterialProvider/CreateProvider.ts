// Necessary imports
import { crudService } from '../../../shared/services/CRUD';
import {
  errorsCrudService,
  errorsProvider,
} from '../../../shared/services/messageErrors';
import {
  IRawMaterials,
  IRawMaterialsWithoutId,
} from '../../models/RawMaterialsInterface';

// Export of the function that creates the raw material
export const create = async (
  data: IRawMaterialsWithoutId
): Promise<IRawMaterials | Error> => {
  try {
    // Call to the crudService function that creates the raw material in the database
    const newRawMaterial: IRawMaterials | Error =
      await crudService.createInDatabase(
        data,
        'RawMaterials',
        errorsCrudService.createMessage('RawMaterials')
      );

    // Returns the error or the created raw material
    return newRawMaterial;
  } catch (error) {
    // Returns the error in case of an exception
    return new Error(errorsProvider.createMessage('RawMaterials'));
  }
};
