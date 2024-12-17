import { crudService } from '../../../shared/services/CRUD';
import {
  errorsCrudService,
  errorsProvider,
} from '../../../shared/services/messageErrors';

export const deleteProductSaleRelation = async (
  id: string
): Promise<Boolean | Error> => {
  try {
    const productSaleRelationDeleted: Boolean | Error =
      await crudService.deleteInDatabase(
        id,
        'ProductSaleRelations',
        errorsCrudService.deleteMessage('ProductSaleRelations')
      );

    return productSaleRelationDeleted;
  } catch (error) {
    return new Error(errorsProvider.deleteMessage('ProductSaleRelations'));
  }
};
