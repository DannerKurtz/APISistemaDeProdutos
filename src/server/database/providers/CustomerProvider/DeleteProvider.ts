import { crudService } from '../../../shared/services/CRUD';
import {
  errorsCrudService,
  errorsProvider,
} from '../../../shared/services/messageErrors';

export const deleteCustomer = async (id: string): Promise<Boolean | Error> => {
  try {
    const deletedCustomer: Boolean | Error = await crudService.deleteInDatabase(
      id,
      'Customers',
      errorsCrudService.deleteMessage('Customers')
    );

    return deletedCustomer;
  } catch (error) {
    return new Error(errorsProvider.deleteMessage('Customers'));
  }
};
