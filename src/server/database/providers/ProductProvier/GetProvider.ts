import { crudService } from '../../../shared/services/CRUD';
import { ProductModel } from '../../models/ProductModel';
import { joinItems } from '../../../shared/services/joinItems';

type IQuery = {
  id?: string;
  nome?: string | object;
};
interface IProductWithRelation extends ProductModel {
  relation: { materiaPrima: { nome: string } }[];
}

export const get = async (query: IQuery) => {
  try {
    const getProduct: ProductModel | Error = await crudService.getInDatabase(
      query,
      'Produtos',
      'Erro ao buscar produtos no banco de dados!'
    );

    if (getProduct instanceof Error) return new Error(getProduct.message);

    const queryOptions = {
      id: getProduct.id,
      modelName: 'relacaoMateriaPrimaEProdutos',
      conditionKey: 'produtoId',
      selectKey: 'materiaPrima',
      message: 'Erro ao buscar a relações',
    };

    return await joinItems(getProduct, queryOptions);
  } catch (error) {
    return new Error('Erro ao consultar a base de dados de produtos e');
  }
};
