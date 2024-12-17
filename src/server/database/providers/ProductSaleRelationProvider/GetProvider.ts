import { crudService } from '../../../shared/services/CRUD';
import { ProductSaleRelationModel } from '../../models/ProductSaleRelationsInterface';

export const get = async (
  id: string
): Promise<ProductSaleRelationModel | Error> => {
  try {
    const getProductSaleRelation: ProductSaleRelationModel | Error =
      await crudService.getInDatabase(
        { id },
        'RelacaoProdutoVenda',
        'Erro ao buscar no banco de dados'
      );

    if (getProductSaleRelation instanceof Error)
      return new Error(getProductSaleRelation.message);

    return getProductSaleRelation;
  } catch (error) {
    return new Error('Erro ao consultar o crudService');
  }
};
