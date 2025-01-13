// Necessary imports
import { crudService } from '../../../shared/services/CRUD';
import {
  errorsCrudService,
  errorsProvider,
} from '../../../shared/services/messageErrors';

// Exporting the responsible function
export const deleteCustomer = async (id: string): Promise<Boolean | Error> => {
  try {
    // Calling the CrudService responsible for deleting the client
    const deletedCustomer: Boolean | Error = await crudService.deleteInDatabase(
      id,
      'Customers',
      errorsCrudService.deleteMessage('Customers')
    );
    // Returning the response with the deleted customer
    return deletedCustomer;
  } catch (error) {
    // Returning the error if an exception occurs
    return new Error(errorsProvider.deleteMessage('Customers'));
  }
};
