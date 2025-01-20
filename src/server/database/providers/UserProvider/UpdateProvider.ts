// Necessary imports
import { crudService } from '../../../shared/services/prismaHelpers/CRUD';
import {
  errorsCrudService,
  errorsProvider,
} from '../../../shared/services/messageErrors';
import { IUsers, IUsersWithoutId } from '../../models/UsersInterface';

// Definition of the interfaces, IData omitting the password and adding the newPassword
// IResultUsers omitting the password
interface IData extends Omit<IUsersWithoutId, 'password'> {
  newPassword: string;
}
interface IResultUsers extends Omit<IUsers, 'password'> {}

// Exporting the function responsible for updating the user
export const update = async (
  id: string,
  data: IData
): Promise<IResultUsers | Error> => {
  try {
    // Calling the function responsible for updating in the database
    const updateUser: IResultUsers | Error = await crudService.updateInDatabase(
      id,
      data,
      'Users',
      errorsCrudService.updateMessage('Users')
    );

    // Returning the updated user or error
    return updateUser;
  } catch (err) {
    // Returns error in case of exception
    return new Error(errorsProvider.updateMessage('Users'));
  }
};
