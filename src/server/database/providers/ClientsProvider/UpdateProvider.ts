import { crudService } from '../../../shared/services/CRUD';
import {
  errorsCrudService,
  errorsProvider,
} from '../../../shared/services/messageErrors';
import {
  ICustomers,
  ICustomersWithoutId,
} from '../../models/CustomersInterface';

export const update = async (
  id: string,
  data: ICustomersWithoutId
): Promise<ICustomers | Error> => {
  try {
    const updateCustomers: ICustomers | Error =
      await crudService.updateInDatabase(
        id,
        data,
        'Customers',
        errorsCrudService.updateMessage('Customers')
      );

    return updateCustomers;
  } catch (error) {
    return new Error(errorsProvider.updateMessage('Customers'));
  }
};
