import { crudService } from '../../../shared/services/CRUD';
import {
  errorsCrudService,
  errorsProvider,
} from '../../../shared/services/messageErrors';

export const deleteProduct = async (id: string): Promise<Boolean | Error> => {
  try {
    const deleteProduct: Boolean | Error = await crudService.deleteInDatabase(
      id,
      'Products',
      errorsCrudService.deleteMessage('Products')
    );

    return deleteProduct;
  } catch (error) {
    return new Error(errorsProvider.deleteMessage('Products'));
  }
};
