import { crudService } from '../../../shared/services/CRUD';
import {
  errorsCrudService,
  errorsProvider,
} from '../../../shared/services/messageErrors';

export const deleteSale = async (id: string): Promise<Boolean | Error> => {
  try {
    const saleDeleted: Boolean | Error = await crudService.deleteInDatabase(
      id,
      'Sales',
      errorsCrudService.deleteMessage('Sales')
    );

    return saleDeleted;
  } catch (error) {
    return new Error(errorsProvider.deleteMessage('Sales'));
  }
};
