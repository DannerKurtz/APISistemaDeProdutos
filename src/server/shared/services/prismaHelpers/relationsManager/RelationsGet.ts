// Prisma import
import { prisma } from '../../../../database/prisma';

// Exports the function that fetches the relation
export const relationsGet = async (modelName: string, prismaArgs: object) => {
  // Calls prisma to fetch the relations, and defines an empty array
  const getRelations = await (prisma as any)[modelName].findMany(prismaArgs);
  const arrayItems = [];

  // Loops through the fetched relations, adding raw materials or products to the items array
  for (let i = 0; i < getRelations.length; i++) {
    if (getRelations[i].rawMaterial) arrayItems.push(getRelations[i]);
    else if (getRelations[i].products)
      arrayItems.push(getRelations[i].products);
  }

  // Returns the items array
  return arrayItems;
};
