import { crudService } from '../../../shared/services/CRUD';
import {
  errorsCrudService,
  errorsProvider,
} from '../../../shared/services/messageErrors';
import { IUsers, IUsersWithoutId } from '../../models/UsersInterface';

interface IData extends Omit<IUsersWithoutId, 'password'> {
  newPassword: string;
}
interface IResultUsers extends Omit<IUsers, 'password'> {}

export const update = async (
  id: string,
  data: IData
): Promise<IResultUsers | Error> => {
  try {
    const updateUser: IResultUsers | Error = await crudService.updateInDatabase(
      id,
      data,
      'Users',
      errorsCrudService.updateMessage('Users')
    );

    return updateUser;
  } catch (err) {
    return new Error(errorsProvider.updateMessage('Users'));
  }
};
