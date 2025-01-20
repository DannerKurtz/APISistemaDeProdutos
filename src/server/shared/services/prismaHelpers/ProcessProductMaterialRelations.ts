// Required imports
import { prisma } from '../../../database/prisma';
import { relationCreator } from './relationsManager/RelationCreator';
import { IRawMaterialProductRelations } from '../../../database/models/RawMaterialProductRelationsInterface';

// Export the function that processes the products and raw materials
export const processProductMaterialRelations = async (
  rawMaterialProductRelation: IRawMaterialProductRelations[],
  productId: string
): Promise<IRawMaterialProductRelations[] | Error> => {
  // Define an empty list with the type of the relation between product and raw material
  const listProductRawMaterialRelations: IRawMaterialProductRelations[] = [];

  // Iterate through the array of relations between raw material and product
  for (let i = 0; i < rawMaterialProductRelation.length; i++) {
    // Call the function to create each relation
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

    // Validation if no error occurred, and return the message
    if (createProductRawMaterialRelation instanceof Error)
      return new Error(createProductRawMaterialRelation.message);

    // Fetch the relation between product and raw material
    const getRawMaterialProductRelation =
      await prisma.rawMaterialProductRelations.findFirst({
        where: {
          rawMaterialId: rawMaterialProductRelation[i].rawMaterialId,
          productId: productId,
        },
      });

    // Add the relation to the list, merging into a single list
    listProductRawMaterialRelations.push(
      getRawMaterialProductRelation as IRawMaterialProductRelations
    );
  }

  // Return the list containing the relations between raw materials and products
  return listProductRawMaterialRelations;
};
