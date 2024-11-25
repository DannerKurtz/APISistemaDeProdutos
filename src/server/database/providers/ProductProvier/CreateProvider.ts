import { crudService } from '../../../shared/services/CRUD';
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

async function relation(
  rawMaterial: [{ id: string; quantidade: number }],
  productId: string
) {
  const rawMaterialLength = rawMaterial.length;

  for (let index = 0; index < rawMaterialLength; index++) {
    const { id: rawMaterialId, quantidade: rawMaterialQuantity } =
      rawMaterial[index];
    const rawMaterialAndProductsRelation: RawMaterialAndProductsRelationWithoutID =
      {
        produtoId: productId,
        materiaPrimaId: rawMaterialId,
        quantidadeMateriaPrima: rawMaterialQuantity,
      };
    // console.log(rawMaterialAndProductsRelation);

    const newRawMaterialAndProductsRelation =
      await crudService.createInDatabase(
        rawMaterialAndProductsRelation,
        'RelacaoMateriaPrimaEProdutos',
        `Erro ao criar uma nova relação com ${rawMaterialId} index ${index}`
      );

    console.log(newRawMaterialAndProductsRelation);
    if (newRawMaterialAndProductsRelation instanceof Error)
      return newRawMaterialAndProductsRelation;
  }
}
