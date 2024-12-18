import { crudService } from '../../../shared/services/CRUD';
import { errorsCrudService, errorsProvider } from '../../../shared/services/messageErrors';
import { IUsers, IUsersWithoutId } from '../../models/UsersInterface';

export const create = async (
  data: IUsersWithoutId
): Promise<IUsers | Error> => {
  try {
    const newUser: IUsers | Error = await crudService.createInDatabase(
      data,
      'Users',
      errorsCrudService.createMessage('Users')
    );

    return newUser;
  } catch (err) {
    console.log(err);
    return new Error(errorsProvider.createMessage('Users'));
  }
};
