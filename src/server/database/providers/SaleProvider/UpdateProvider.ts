import { crudService } from '../../../shared/services/CRUD';
import { SaleModel } from '../../models/SaleModel';

type saleWithoutID = Omit<SaleModel, 'id'>;

export const update = async (id: string, body: saleWithoutID) => {
  try {
    const updateDateSale = await crudService.updateInDatabase(
      id,
      body,
      'Vendas',
      'Erro ao atualizar a venda'
    );

    if (updateDateSale instanceof Error)
      return new Error(updateDateSale.message);

    return updateDateSale;
  } catch (error) {
    return new Error('Erro ao atualizar a venda no banco de dados');
  }
};
