// Necessary imports
import { crudService } from '../../../shared/services/CRUD';
import {
  errorsCrudService,
  errorsProvider,
} from '../../../shared/services/messageErrors';

// Export of the function responsible for deleting the user
export const deleteUser = async (id: string): Promise<Boolean | Error> => {
  try {
    // Calls the function that will delete the user in the database
    const deletedUser: Boolean | Error = await crudService.deleteInDatabase(
      id,
      'Users',
      errorsCrudService.deleteMessage('Users')
    );

    // Returns whether the user was deleted or if there was an error
    return deletedUser;
  } catch (error) {
    // Returns the error in case of an exception
    return new Error(errorsProvider.deleteMessage('Users'));
  }
};
