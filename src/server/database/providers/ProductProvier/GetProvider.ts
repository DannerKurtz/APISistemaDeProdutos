import { crudService } from '../../../shared/services/CRUD';
import { ProductModel } from '../../models/ProductModel';

type IQuery = {
  id?: string;
  nome?: string | object;
};

export const get = async (query: IQuery): Promise<ProductModel | Error> => {
  try {
    const getProduct: ProductModel | Error = await crudService.getInDatabase(
      query,
      'Produtos',
      'Erro ao buscar produtos no banco de dados!'
    );

    if (getProduct instanceof Error) return new Error(getProduct.message);

    return getProduct;
  } catch (error) {
    return new Error('Erro ao consultar a base de dados de produtos e');
  }
};
