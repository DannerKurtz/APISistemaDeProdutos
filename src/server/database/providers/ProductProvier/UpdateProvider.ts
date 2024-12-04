import { crudService } from '../../../shared/services/CRUD';
import { ProductModel } from '../../models/ProductModel';

type BodyWithoutId = Omit<ProductModel, 'id'> & { senha: undefined };
export const update = async (
  id: string,
  body: BodyWithoutId
): Promise<ProductModel | Error> => {
  try {
    const data = body;
    const productUpdate = await crudService.updateInDatabase(
      id,
      data,
      'Produtos',
      'Erro ao atualizar o produto'
    );

    if (productUpdate instanceof Error) return new Error(productUpdate.message);

    return productUpdate;
  } catch (error) {
    return new Error(
      'Error ao tentar fazer as alterações na base de dados do Produto'
    );
  }
};
