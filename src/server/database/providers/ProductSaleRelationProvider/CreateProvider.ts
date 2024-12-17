import { crudService } from '../../../shared/services/CRUD';
import {
  errorsCrudService,
  errorsProvider,
} from '../../../shared/services/messageErrors';
import {
  IProductSaleRelations,
  IProductSaleRelationsWithoutId,
} from '../../models/ProductSaleRelationsInterface';

export const create = async (
  body: IProductSaleRelationsWithoutId
): Promise<IProductSaleRelations | Error> => {
  try {
    const newProductSaleRelation: IProductSaleRelations | Error =
      await crudService.createInDatabase(
        body,
        'ProductSaleRelations',
        errorsCrudService.createMessage('ProductSaleRelations')
      );

    return newProductSaleRelation;
  } catch (error) {
    return new Error(errorsProvider.createMessage('ProductSaleRelations'));
  }
};
