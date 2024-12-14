import { crudService } from '../../../shared/services/CRUD';
import { ProductSaleRelationModel } from '../../models/ProductSaleRelationModel';

type RelationWithoutId = Omit<ProductSaleRelationModel, 'id'>;

export const create = async (
  body: RelationWithoutId
): Promise<Error | ProductSaleRelationModel> => {
  try {
    const newProductSaleRelation: Error | ProductSaleRelationModel =
      await crudService.createInDatabase(
        body,
        'RelacaoProdutoVenda',
        'Error ao criar nova relação entre vendas e produtos'
      );

    if (newProductSaleRelation instanceof Error)
      return new Error(newProductSaleRelation.message);

    return newProductSaleRelation;
  } catch (error) {
    return new Error('Erro ao acessar o crudService');
  }
};
