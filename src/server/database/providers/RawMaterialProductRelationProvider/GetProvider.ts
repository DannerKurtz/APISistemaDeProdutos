import { crudService } from '../../../shared/services/CRUD';
import {
  errorsCrudService,
  errorsProvider,
} from '../../../shared/services/messageErrors';
import { IRawMaterialProductRelations } from '../../models/RawMaterialProductRelationsInterface';

export const get = async (
  id: string
): Promise<IRawMaterialProductRelations | Error> => {
  try {
    const getRawMaterialProductRelation: IRawMaterialProductRelations | Error =
      await crudService.getInDatabase(
        { id },
        'RawMaterialProductRelations',
        errorsCrudService.getMessage('RawMaterialProductRelations')
      );

    return getRawMaterialProductRelation;
  } catch (error) {
    return new Error(errorsProvider.getMessage('RawMaterialProductRelations'));
  }
};
