import { crudService } from '../../../shared/services/CRUD';
import {
  errorsCrudService,
  errorsProvider,
} from '../../../shared/services/messageErrors';
import {
  ICustomers,
  ICustomersWithoutId,
} from '../../models/CustomersInterface';

export const create = async (
  data: ICustomersWithoutId
): Promise<ICustomers | Error> => {
  try {
    const newClient: ICustomers | Error = await crudService.createInDatabase(
      data,
      'Customers',
      errorsCrudService.createMessage('Customers')
    );

    return newClient;
  } catch (error) {
    return new Error(errorsProvider.createMessage('Customers'));
  }
};
