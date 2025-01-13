// Necessary imports
import { crudService } from '../../../shared/services/CRUD';
import {
  errorsCrudService,
  errorsProvider,
} from '../../../shared/services/messageErrors';
import { ICustomers } from '../../models/CustomersInterface';

// Defining the query interface
interface IQuery {
  id?: string;
  nome?: string;
}

// Exporting the function responsible for fetching the client
export const get = async (query: IQuery): Promise<ICustomers | Error> => {
  try {
    // Calling the CrudService function to fetch the client from the database
    const getCustomers: ICustomers | Error = await crudService.getInDatabase(
      query,
      'Customers',
      errorsCrudService.getMessage('Customers')
    );

    // Returning the response with the fetched customer
    return getCustomers;
  } catch (error) {
    // Returning if an error exception occurs
    return new Error(errorsProvider.getMessage('Customers'));
  }
};
