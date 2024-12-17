import { crudService } from '../../../shared/services/CRUD';
import { IProducts, IProductsWithoutId } from '../../models/ProductsInterface';

export const create = async (
  data: IProductsWithoutId
): Promise<IProducts | Error> => {
  try {
    const newProduct: IProducts | Error = await crudService.createInDatabase(
      data,
      'Produtos',
      'Erro ao criar novo produto'
    );
    if (newProduct instanceof Error) return new Error(newProduct.message);

    return newProduct;
  } catch (error) {
    return new Error('Erro ao criar novo produto no banco de dados');
  }
};
