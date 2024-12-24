import { IProducts } from '../../../database/models/ProductsInterface';
import { IRawMaterials } from '../../../database/models/RawMaterialsInterface';
import { prisma } from '../../../database/prisma';

export const relationsGet = async (modelName: string, prismaArgs: object) => {
  const getRelations = await (prisma as any)[modelName].findMany(prismaArgs);
  const arrayItens = [];
  for (let i = 0; i < getRelations.length; i++) {
    if (getRelations[i].rawMaterial)
      arrayItens.push(getRelations[i].rawMaterial);
    else if (getRelations[i].products)
      arrayItens.push(getRelations[i].products);
  }

  return arrayItens;
};
