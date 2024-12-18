import { crudService } from '../../../shared/services/CRUD';
import {
  errorsCrudService,
  errorsProvider,
} from '../../../shared/services/messageErrors';
import {
  IRawMaterials,
  IRawMaterialsWithoutId,
} from '../../models/RawMaterialsInterface';

export const create = async (
  data: IRawMaterialsWithoutId
): Promise<IRawMaterials | Error> => {
  try {
    const newRawMaterial: IRawMaterials | Error =
      await crudService.createInDatabase(
        data,
        'RawMaterials',
        errorsCrudService.createMessage('RawMaterials')
      );

    return newRawMaterial;
  } catch (error) {
    return new Error(errorsProvider.createMessage('RawMaterials'));
  }
};
