import { crudService } from '../../../shared/services/CRUD';
import {
  errorsCrudService,
  errorsProvider,
} from '../../../shared/services/messageErrors';
import {
  IRawMaterialProductRelations,
  IRawMaterialProductRelationsWithoutId,
} from '../../models/RawMaterialProductRelationsInterface';

export const update = async (
  id: string,
  data: IRawMaterialProductRelationsWithoutId
): Promise<IRawMaterialProductRelations | Error> => {
  try {
    const updateRawMaterialProductRelation:
      | IRawMaterialProductRelations
      | Error = await crudService.updateInDatabase(
      id,
      data,
      'RawMaterialProductRelations',
      errorsCrudService.updateMessage('RawMaterialProductRelations')
    );

    return updateRawMaterialProductRelation;
  } catch (error) {
    return new Error(
      errorsProvider.updateMessage('RawMaterialProductRelations')
    );
  }
};
