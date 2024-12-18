import { crudService } from '../../../shared/services/CRUD';
import {
  errorsCrudService,
  errorsProvider,
} from '../../../shared/services/messageErrors';
import { ICustomers } from '../../models/CustomersInterface';

interface IQuery {
  id?: string;
  nome?: string;
}

export const get = async (query: IQuery): Promise<ICustomers | Error> => {
  try {
    const getCustomers: ICustomers | Error = await crudService.getInDatabase(
      query,
      'Customers',
      errorsCrudService.getMessage('Customers')
    );

    return getCustomers;
  } catch (error) {
    return new Error(errorsProvider.getMessage('Customers'));
  }
};
