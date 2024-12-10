import { crudService } from '../../../shared/services/CRUD';

export const deleteProduct = async (id: string): Promise<true | Error> => {
  try {
    const deleteProduct = await crudService.deleteInDatabase(
      id,
      'Produtos',
      'erro ao deletar produto, verifique se não há relação com a materia prima'
    );

    if (deleteProduct instanceof Error) return new Error(deleteProduct.message);

    return true;
  } catch (error) {
    return new Error('Erro ao acessar a base de dados para deletar o produto');
  }
};
