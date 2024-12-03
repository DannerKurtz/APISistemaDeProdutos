import { crudService } from '.';
import { RawMaterialAndProductsRelationModel } from '../../../database/models/RawMaterialAndProductsRelationModel';

type RawMaterialAndProductsRelationWithoutID = Omit<
  RawMaterialAndProductsRelationModel,
  'id'
> & { nome?: string | undefined };

export async function relation(
  rawMaterial: [{ id: string; quantidade: number }],
  productId: string
) {
  const rawMaterialLength = rawMaterial.length;
  let arrayNewRawMaterialAndProductsRelation: [];
  for (let index = 0; index < rawMaterialLength; index++) {
    const { id: rawMaterialId, quantidade: rawMaterialQuantity } =
      rawMaterial[index];
    const rawMaterialAndProductsRelation: RawMaterialAndProductsRelationWithoutID =
      {
        produtoId: productId,
        materiaPrimaId: rawMaterialId,
        quantidadeMateriaPrima: rawMaterialQuantity,
      };

    const newRawMaterialAndProductsRelation =
      await crudService.createInDatabase(
        rawMaterialAndProductsRelation,
        'RelacaoMateriaPrimaEProdutos',
        `Erro ao criar uma nova relação com ${rawMaterialId} index ${index}`
      );

    if (newRawMaterialAndProductsRelation instanceof Error)
      return newRawMaterialAndProductsRelation;
  }
}
