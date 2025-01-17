// Necessary imports
import { crudService } from '../../../shared/services/CRUD';
import {
  errorsCrudService,
  errorsProvider,
} from '../../../shared/services/messageErrors';
import {
  IProductSaleRelations,
  IProductSaleRelationsWithoutId,
} from '../../models/ProductSaleRelationsInterface';

// Export of the function responsible for creating the sales and products relationship
export const create = async (
  body: IProductSaleRelationsWithoutId
): Promise<IProductSaleRelations | Error> => {
  try {
    // Calling the crudService function responsible for creating in the database
    const newProductSaleRelation: IProductSaleRelations | Error =
      await crudService.createInDatabase(
        body,
        'ProductSaleRelations',
        errorsCrudService.createMessage('ProductSaleRelations')
      );

    // Returns the new relationship between product and sales
    return newProductSaleRelation;
  } catch (error) {
    // Returns the error if there's an exception
    return new Error(errorsProvider.createMessage('ProductSaleRelations'));
  }
};
