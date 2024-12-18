import { crudService } from '../../../shared/services/CRUD';
import {
  errorsCrudService,
  errorsProvider,
} from '../../../shared/services/messageErrors';

export const deleteUser = async (id: string): Promise<Boolean | Error> => {
  try {
    const deletedUser: Boolean | Error = await crudService.deleteInDatabase(
      id,
      'Users',
      errorsCrudService.deleteMessage('Users')
    );

    return deletedUser;
  } catch (error) {
    return new Error(errorsProvider.deleteMessage('Users'));
  }
};
