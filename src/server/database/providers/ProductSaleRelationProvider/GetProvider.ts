import { crudService } from '../../../shared/services/CRUD';
import {
  errorsCrudService,
  errorsProvider,
} from '../../../shared/services/messageErrors';
import { IProductSaleRelations } from '../../models/ProductSaleRelationsInterface';

export const get = async (
  id: string
): Promise<IProductSaleRelations | Error> => {
  try {
    const getProductSaleRelation: IProductSaleRelations | Error =
      await crudService.getInDatabase(
        { id },
        'ProductSaleRelations',
        errorsCrudService.getMessage('ProductSaleRelations')
      );

    return getProductSaleRelation;
  } catch (error) {
    return new Error(errorsProvider.getMessage('ProductSaleRelations'));
  }
};
