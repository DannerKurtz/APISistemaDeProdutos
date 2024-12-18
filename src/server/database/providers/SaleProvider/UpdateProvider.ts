import { crudService } from '../../../shared/services/CRUD';
import {
  errorsCrudService,
  errorsProvider,
} from '../../../shared/services/messageErrors';
import { ISalesWithoutId } from '../../models/SalesInterface';

export const update = async (id: string, body: ISalesWithoutId) => {
  try {
    const updateDateSale = await crudService.updateInDatabase(
      id,
      body,
      'Sales',
      errorsCrudService.updateMessage('Sales')
    );

    return updateDateSale;
  } catch (error) {
    return new Error(errorsProvider.updateMessage('Sales'));
  }
};
