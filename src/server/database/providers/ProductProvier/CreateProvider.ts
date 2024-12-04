import { crudService } from '../../../shared/services/CRUD';
import { relation } from '../../../shared/services/CRUD/createRelation';
import { ProductModel } from '../../models/ProductModel';
import { RawMaterialAndProductsRelationModel } from '../../models/RawMaterialAndProductsRelationModel';

type productWithoutID = Omit<ProductModel, 'id'>;

export const create = async (
  data: productWithoutID,
): Promise<{} | Error> => {
  try {
    const newProduct: ProductModel | Error = await crudService.createInDatabase(
      data,
      'Produtos',
      'Erro ao criar novo produto'
    );
    if (newProduct instanceof Error) return new Error(newProduct.message);

    return newProduct
  } catch (error) {
    return new Error('Erro ao criar novo produto no banco de dados');
  }
};
