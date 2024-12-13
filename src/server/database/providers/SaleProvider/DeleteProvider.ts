import { crudService } from '../../../shared/services/CRUD';

export const deleteSale = async (id: string): Promise<Error | Boolean> => {
  try {
    const saleDelete = await crudService.deleteInDatabase(
      id,
      'Vendas',
      'Erro ao deletar o pedido'
    );

    if (saleDelete instanceof Error) return new Error(saleDelete.message);

    return saleDelete;
  } catch (error) {
    return new Error('Erro ao acessar o crudService para deletar o pedido!');
  }
};
