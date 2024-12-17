import { crudService } from '../../../shared/services/CRUD';
import { errorsCrudService } from '../../../shared/services/messageErrors';
import { IProducts } from '../../models/ProductsInterface';

type IQuery = {
  id?: string;
  nome?: string | object;
};

export const get = async (query: IQuery): Promise<IProducts | Error> => {
  try {
    const getProduct: IProducts | Error = await crudService.getInDatabase(
      query,
      'Products',
      errorsCrudService.getMessage('Products')
    );

    return getProduct;
  } catch (error) {
    return new Error('Erro ao consultar a base de dados de produtos');
  }
};
