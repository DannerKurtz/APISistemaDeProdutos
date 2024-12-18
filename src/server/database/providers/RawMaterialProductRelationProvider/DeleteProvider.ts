import { crudService } from '../../../shared/services/CRUD';
import {
  errorsCrudService,
  errorsProvider,
} from '../../../shared/services/messageErrors';

export const deleteRawMaterialProductRelation = async (
  id: string
): Promise<Boolean | Error> => {
  try {
    const deletedRawMaterialProductionRelation: Boolean | Error =
      await crudService.deleteInDatabase(
        id,
        'RawMaterialProductRelations',
        errorsCrudService.deleteMessage('RawMaterialProductRelations')
      );

    return deletedRawMaterialProductionRelation;
  } catch (error) {
    return new Error(
      errorsProvider.deleteMessage('RawMaterialProductRelations')
    );
  }
};
