// Necessary import
import { crudService } from '../../../shared/services/CRUD';
import {
  errorsCrudService,
  errorsProvider,
} from '../../../shared/services/messageErrors';
import {
  ICustomers,
  ICustomersWithoutId,
} from '../../models/CustomersInterface';

// Exporting the function responsible for updating
export const update = async (
  id: string,
  data: ICustomersWithoutId
): Promise<ICustomers | Error> => {
  try {
    // Calling the CrudService function that updates the customer in the database
    const updateCustomers: ICustomers | Error =
      await crudService.updateInDatabase(
        id,
        data,
        'Customers',
        errorsCrudService.updateMessage('Customers')
      );

    // Returning the response from updateCustomers
    return updateCustomers;
  } catch (error) {
    // Returning if an exception occurs
    return new Error(errorsProvider.updateMessage('Customers'));
  }
};
