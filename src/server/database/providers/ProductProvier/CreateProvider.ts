import { crudService } from '../../../shared/services/CRUD';
import { relation } from '../../../shared/services/CRUD/createRelation';
import { ProductModel } from '../../models/ProductModel';
import { RawMaterialAndProductsRelationModel } from '../../models/RawMaterialAndProductsRelationModel';

type productWithoutID = Omit<ProductModel, 'id'>;
type RawMaterialAndProductsRelationWithoutID = Omit<
  RawMaterialAndProductsRelationModel,
  'id'
> & { nome?: string | undefined };

export const create = async (
  data: productWithoutID,
  rawMaterial: [{ id: string; quantidade: number }]
): Promise<{} | Error> => {
  try {
    const newProduct: ProductModel | Error = await crudService.createInDatabase(
      data,
      'Produtos',
      'Erro ao criar novo produto'
    );
    if (newProduct instanceof Error) return new Error(newProduct.message);

    await relation(rawMaterial, newProduct.id);

    return { newProduct, rawMaterial };
  } catch (error) {
    return new Error('Erro ao criar novo produto no banco de dados');
  }
};
