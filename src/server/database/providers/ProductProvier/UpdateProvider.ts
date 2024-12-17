import { crudService } from '../../../shared/services/CRUD';
import {
  errorsCrudService,
  errorsProvider,
} from '../../../shared/services/messageErrors';
import { IProducts, IProductsWithoutId } from '../../models/ProductsInterface';

export const update = async (
  id: string,
  body: IProductsWithoutId
): Promise<IProducts | Error> => {
  try {
    const data: IProductsWithoutId = body;
    const productUpdate: IProducts | Error = await crudService.updateInDatabase(
      id,
      data,
      'Products',
      errorsCrudService.updateMessage('Products')
    );

    return productUpdate;
  } catch (error) {
    return new Error(errorsProvider.updateMessage('Products'));
  }
};
