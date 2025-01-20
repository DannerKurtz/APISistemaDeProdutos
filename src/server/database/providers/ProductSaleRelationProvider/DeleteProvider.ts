// Import necessary modules and services
import { crudService } from '../../../shared/services/CRUD';
import {
  errorsCrudService,
  errorsProvider,
} from '../../../shared/services/messageErrors';

// Function to delete the relationship between products and sales
export const deleteProductSaleRelation = async (
  id: string
): Promise<boolean | Error> => {
  try {
    // Calls the crudService to handle the deletion in the database
    const deletedProductSaleRelation: boolean | Error =
      await crudService.deleteInDatabase(
        id,
        'ProductSaleRelations',
        errorsCrudService.deleteMessage('ProductSaleRelations')
      );

    // Returns the result of the deletion or an error
    return deletedProductSaleRelation;
  } catch (error) {
    // Handles exceptions and returns a descriptive error
    return new Error(errorsProvider.deleteMessage('ProductSaleRelations'));
  }
};
