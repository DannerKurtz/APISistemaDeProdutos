// Necessary imports
import { crudService } from '../../../shared/services/prismaHelpers/CRUD';
import {
  errorsCrudService,
  errorsProvider,
} from '../../../shared/services/messageErrors';
import { IUsers, IUsersWithoutId } from '../../models/UsersInterface';

// Export of the function responsible for creating a new user
export const create = async (
  data: IUsersWithoutId
): Promise<IUsers | Error> => {
  try {
    // Calls the crudService function responsible for creating the user in the database
    const newUser: IUsers | Error = await crudService.createInDatabase(
      data,
      'Users',
      errorsCrudService.createMessage('Users')
    );

    // Returns the new user or an error
    return newUser;
  } catch (err) {
    // Returns the error in case of an exception
    return new Error(errorsProvider.createMessage('Users'));
  }
};
