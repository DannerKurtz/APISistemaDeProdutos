import { crudService } from '../../../shared/services/CRUD';
import {
  errorsCrudService,
  errorsProvider,
} from '../../../shared/services/messageErrors';
import {
  IRawMaterials,
  IRawMaterialsWithoutId,
} from '../../models/RawMaterialsInterface';

export const update = async (
  id: string,
  data: IRawMaterialsWithoutId
): Promise<IRawMaterials | Error> => {
  try {
    const updateRawMaterial: IRawMaterials | Error =
      await crudService.updateInDatabase(
        id,
        data,
        'RawMaterials',
        errorsCrudService.updateMessage('RawMaterials')
      );

    return updateRawMaterial;
  } catch (error) {
    return new Error(errorsProvider.updateMessage('RawMaterials'));
  }
};
