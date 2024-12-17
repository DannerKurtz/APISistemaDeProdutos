import { crudService } from '../../../shared/services/CRUD';
import { SaleModel } from '../../models/SalesInterface';

type saleWithoutID = Omit<SaleModel, 'id'>;

export const create = async (data: saleWithoutID) => {
  try {
    const { usuarioId, clienteId } = data;

    const validateUserIdExists = await crudService.getInDatabase(
      { id: usuarioId, nome: undefined },
      'Usuarios',
      'Usuário não encontrado'
    );
    const validateClientIdExists = await crudService.getInDatabase(
      { id: clienteId, nome: undefined },
      'Clientes',
      'Cliente não encontrado'
    );
    console.log(
      `validateUserIdExists: ${validateUserIdExists}, validateClientIdExists: ${validateClientIdExists}`
    );
    if (validateUserIdExists === null)
      return new Error('Usuário não encontrado');
    if (validateClientIdExists === null)
      return new Error('Cliente não encontrado');

    const newSale: SaleModel | Error = await crudService.createInDatabase(
      data,
      'Vendas',
      'Erro ao criar nova venda'
    );
    if (newSale instanceof Error) return new Error(newSale.message);

    return newSale;
  } catch (error) {
    return new Error('Erro ao criar nova venda no banco de dados');
  }
};
