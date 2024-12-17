import { crudService } from '../../../shared/services/CRUD';
import {
  errorsCrudService,
  errorsProvider,
} from '../../../shared/services/messageErrors';
import { IProducts, IProductsWithoutId } from '../../models/ProductsInterface';

export const create = async (
  data: IProductsWithoutId
): Promise<IProducts | Error> => {
  try {
    const newProduct: IProducts | Error = await crudService.createInDatabase(
      data,
      'Products',
      errorsCrudService.createMessage('Products')
    );
    if (newProduct instanceof Error) return new Error(newProduct.message);

    return newProduct;
  } catch (error) {
    return new Error(errorsProvider.createMessage('Products'));
  }
};
