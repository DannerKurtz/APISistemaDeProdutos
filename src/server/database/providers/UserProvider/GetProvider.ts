// Necessary imports
import { crudService } from '../../../shared/services/prismaHelpers/CRUD';
import {
  errorsCrudService,
  errorsProvider,
} from '../../../shared/services/messageErrors';
import { IUsers } from '../../models/UsersInterface';

// Definition of the query interface
interface IQuery {
  id?: string;
  name?: string;
}

// Export of the function responsible for getting the user
export const get = async (query: IQuery): Promise<IUsers | Error> => {
  try {
    // Calls the function responsible for getting users from the database
    const getUsers: IUsers | Error = await crudService.getInDatabase(
      query,
      'Users',
      errorsCrudService.getMessage('Users')
    );

    // Returns the users or error
    return getUsers;
  } catch (err) {
    // Returns error in case of exception
    return new Error(errorsProvider.getMessage('Users'));
  }
};
