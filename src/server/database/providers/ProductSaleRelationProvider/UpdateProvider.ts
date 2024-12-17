import { crudService } from '../../../shared/services/CRUD';
import { ProductSaleRelationModel } from '../../models/ProductSaleRelationsInterface';

type RelationWithoutId = Omit<ProductSaleRelationModel, 'id'>;

export const update = async (
  id: string,
  data: RelationWithoutId
): Promise<ProductSaleRelationModel | Error> => {
  try {
    const updatedProductSaleRelation = await crudService.updateInDatabase(
      id,
      data,
      'RelacaoProdutoVenda',
      'Erro ao alterar dados '
    );

    if (updatedProductSaleRelation instanceof Error)
      return new Error(updatedProductSaleRelation.message);

    return updatedProductSaleRelation;
  } catch (error) {
    return new Error('Error ao acessar ao banco de dados');
  }
};
