// Prisma import
import { prisma } from '../../../../database/prisma';

// Exports the function that updates relations by deleting the existing ones and creating new ones
export const updateRelations = async <T>(
  modelName: string,
  whereCondition: object,
  updateDataRelations: object[]
): Promise<T[]> => {
  // Fetch the existing relations
  const relations = await (prisma as any)[modelName].findMany({
    where: whereCondition,
  });

  const updatedRelations: T[] = [];

  // Deletes each found relation
  for (let i = 0; i < relations.length; i++) {
    const deletedRelation = await (prisma as any)[modelName].delete({
      where: { id: relations[i].id },
    });
  }

  // Creates each new relation
  for (let i = 0; i < updateDataRelations.length; i++) {
    const newRelation = await (prisma as any)[modelName].create({
      data: updateDataRelations[i],
    });
    updatedRelations.push(newRelation);
  }

  // Returns the list of updated relations
  return updatedRelations;
};
