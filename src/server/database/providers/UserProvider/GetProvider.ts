import { crudService } from '../../../shared/services/CRUD';
import {
  errorsCrudService,
  errorsProvider,
} from '../../../shared/services/messageErrors';
import { IUsers } from '../../models/UsersInterface';

interface IQuery {
  id: string;
  nome: string;
}

export const get = async (query: IQuery): Promise<IUsers | Error> => {
  try {
    const getUsers: IUsers | Error = await crudService.getInDatabase(
      query,
      'Users',
      errorsCrudService.getMessage('Users')
    );

    return getUsers;
  } catch (err) {
    return new Error(errorsProvider.getMessage('Users'));
  }
};
