import { crudService } from '../../../shared/services/CRUD';
import { errorsCrudService, errorsProvider } from '../../../shared/services/messageErrors';
import { IRawMaterialProductRelations, IRawMaterialProductRelationsWithoutId } from '../../models/RawMaterialProductRelationsInterface';

export const create = async (
  data: IRawMaterialProductRelationsWithoutId
): Promise<IRawMaterialProductRelations | Error> => {
  try {
    const newRawMaterialProductRelation: IRawMaterialProductRelations | Error =
      await crudService.createInDatabase(
        data,
        'RawMaterialProductRelations',
        errorsCrudService.createMessage('RawMaterialProductRelations')
      );

    return newRawMaterialProductRelation;
  } catch (error) {
    return new Error(
      errorsProvider.createMessage('RawMaterialProductRelations')
    );
  }
};
