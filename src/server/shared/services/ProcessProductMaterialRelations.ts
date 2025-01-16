import { prisma } from '../../database/prisma';
import { relationCreator } from './relationsManager/RelationCreator';
import { IRawMaterialProductRelations } from '../../database/models/RawMaterialProductRelationsInterface';

export const processProductMaterialRelations = async (
  rawMaterialProductRelation: IRawMaterialProductRelations[],
  productId: string
): Promise<IRawMaterialProductRelations[] | Error> => {
  const listProductRawMaterialRelations: IRawMaterialProductRelations[] = [];

  for (let i = 0; i < rawMaterialProductRelation.length; i++) {
    console.log('entrou no loop', [i]);

    const createProductRawMaterialRelation = await relationCreator(
      rawMaterialProductRelation[i],
      {
        productId: productId as string,
        rawMaterialId: rawMaterialProductRelation[i].rawMaterialId,
        rawMaterialQuantity: rawMaterialProductRelation[i].rawMaterialQuantity,
      },
      'RawMaterialProductRelations',
      'RawMaterials'
    );

    if (createProductRawMaterialRelation instanceof Error)
      return new Error(createProductRawMaterialRelation.message);

    const getRawMaterialProductRelation =
      await prisma.rawMaterialProductRelations.findFirst({
        where: {
          rawMaterialId: rawMaterialProductRelation[i].rawMaterialId,
          productId: productId,
        },
      });

    listProductRawMaterialRelations.push(
      getRawMaterialProductRelation as IRawMaterialProductRelations
    );
  }

  return listProductRawMaterialRelations;
};
