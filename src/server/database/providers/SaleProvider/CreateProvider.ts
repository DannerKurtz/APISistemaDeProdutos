import { crudService } from '../../../shared/services/CRUD';
import {
  errorsCrudService,
  errorsProvider,
} from '../../../shared/services/messageErrors';
import { ISalesWithoutId, ISales } from '../../models/SalesInterface';

export const create = async (
  data: ISalesWithoutId
): Promise<ISales | Error> => {
  try {
    const { userId, customerId } = data;

    const validateUserIdExists = await crudService.getInDatabase(
      { id: userId, name: undefined },
      'Users',
      errorsCrudService.getMessage('Users')
    );
    const validateClientIdExists = await crudService.getInDatabase(
      { id: customerId, name: undefined },
      'Customers',
      errorsCrudService.getMessage('Customers')
    );

    if (validateUserIdExists === null) return new Error('User not exists');
    if (validateClientIdExists === null)
      return new Error('Customer not exists');

    const newSale: ISales | Error = await crudService.createInDatabase(
      data,
      'Sales',
      errorsCrudService.createMessage('Sales')
    );

    return newSale;
  } catch (error) {
    return new Error(errorsProvider.createMessage('Sales'));
  }
};
