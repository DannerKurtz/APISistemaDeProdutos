import { crudService } from '../../../shared/services/CRUD';
import { errorsCrudService, errorsProvider } from '../../../shared/services/messageErrors';
import {
  IProductSaleRelations,
  IProductSaleRelationsWithoutId,
} from '../../models/ProductSaleRelationsInterface';

export const update = async (
  id: string,
  data: IProductSaleRelationsWithoutId
): Promise<IProductSaleRelations | Error> => {
  try {
    const updatedProductSaleRelation: IProductSaleRelations | Error =
      await crudService.updateInDatabase(
        id,
        data,
        'ProductSaleRelations',
        errorsCrudService.updateMessage('ProductSaleRelations')
      );

    return updatedProductSaleRelation;
  } catch (error) {
    return new Error(errorsProvider.updateMessage('ProductSaleRelations'));
  }
};
