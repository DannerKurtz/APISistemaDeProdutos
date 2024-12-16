import { crudService } from '../../../shared/services/CRUD';

export const deleteProductSaleRelation = async (
  id: string
): Promise<Boolean | Error> => {
  try {
    const productSaleRelationDeleted: boolean | Error =
      await crudService.deleteInDatabase(
        id,
        'RelacaoProdutoVenda',
        'Erro ao deletar productSaleRelation'
      );

    if (productSaleRelationDeleted instanceof Error)
      return new Error(productSaleRelationDeleted.message);

    return productSaleRelationDeleted;
  } catch (error) {
    return new Error('Erro ao tentar deletar na base de dados');
  }
};
