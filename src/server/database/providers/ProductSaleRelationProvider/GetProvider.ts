// Necessary imports
import { crudService } from '../../../shared/services/prismaHelpers/CRUD';
import {
  errorsCrudService,
  errorsProvider,
} from '../../../shared/services/messageErrors';
import { IProductSaleRelations } from '../../models/ProductSaleRelationsInterface';

// Export of the function responsible for fetching the product and sales relationships
export const get = async (
  id: string
): Promise<IProductSaleRelations | Error> => {
  try {
    // Call to the crudService function that performs the database query
    const getProductSaleRelation: IProductSaleRelations | Error =
      await crudService.getInDatabase(
        { id },
        'ProductSaleRelations',
        errorsCrudService.getMessage('ProductSaleRelations')
      );

    // Returns the relationship or the error
    return getProductSaleRelation;
  } catch (error) {
    // Returns the error in case of an exception
    return new Error(errorsProvider.getMessage('ProductSaleRelations'));
  }
};
