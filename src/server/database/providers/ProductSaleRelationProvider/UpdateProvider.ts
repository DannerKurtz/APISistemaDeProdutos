// Necessary imports
import { crudService } from '../../../shared/services/prismaHelpers/CRUD';
import {
  errorsCrudService,
  errorsProvider,
} from '../../../shared/services/messageErrors';
import {
  IProductSaleRelations,
  IProductSaleRelationsWithoutId,
} from '../../models/ProductSaleRelationsInterface';

// Export of the function that updates the relationship between product and sales
export const update = async (
  id: string,
  data: IProductSaleRelationsWithoutId
): Promise<IProductSaleRelations | Error> => {
  try {
    // Call to the crudService function responsible for updating in the database
    const updatedProductSaleRelation: IProductSaleRelations | Error =
      await crudService.updateInDatabase(
        id,
        data,
        'ProductSaleRelations',
        errorsCrudService.updateMessage('ProductSaleRelations')
      );

    // Returns the relationships or an error
    return updatedProductSaleRelation;
  } catch (error) {
    // Returns the error in case of an exception
    return new Error(errorsProvider.updateMessage('ProductSaleRelations'));
  }
};
