// Necessary imports
import { crudService } from '../../../shared/services/CRUD';
import {
  errorsCrudService,
  errorsProvider,
} from '../../../shared/services/messageErrors';
import {
  ICustomers,
  ICustomersWithoutId,
} from '../../models/CustomersInterface';

// Exporting the function responsible for creation
export const create = async (
  data: ICustomersWithoutId
): Promise<ICustomers | Error> => {
  try {
    // Calling the crudService function responsible for creating the client in the database
    const newClient: ICustomers | Error = await crudService.createInDatabase(
      data,
      'Customers',
      errorsCrudService.createMessage('Customers')
    );

    // Returning the response with the new client created
    return newClient;
  } catch (error) {
    // Returning the error if something goes wrong
    return new Error(errorsProvider.createMessage('Customers'));
  }
};
