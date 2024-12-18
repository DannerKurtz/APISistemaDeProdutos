import { crudService } from '../../../shared/services/CRUD';
import {
  errorsCrudService,
  errorsProvider,
} from '../../../shared/services/messageErrors';

export const deleteRawMaterial = async (
  id: string
): Promise<Boolean | Error> => {
  try {
    const deletedRawMaterial: Boolean | Error =
      await crudService.deleteInDatabase(
        id,
        'RawMaterials',
        errorsCrudService.deleteMessage('RawMaterials')
      );

    return deletedRawMaterial;
  } catch (error) {
    return new Error(errorsProvider.deleteMessage('RawMaterials'));
  }
};
