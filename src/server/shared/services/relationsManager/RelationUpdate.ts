import { prisma } from '../../../database/prisma';

export const updateRelations = async <T>(
  modelName: string,
  whereCondition: object,
  updateDataRelations: object[]
): Promise<T[]> => {
  // Buscar as relações existentes
  const relations = await (prisma as any)[modelName].findMany({
    where: whereCondition,
  });

  const updatedRelations: T[] = [];

  // deleta cada relação encontrada
  for (let i = 0; i < relations.length; i++) {
    const deletedRelation = await (prisma as any)[modelName].delete({
      where: { id: relations[i].id },
    });
  }

  for (let i = 0; i < updateDataRelations.length; i++) {
    const newRelation = await (prisma as any)[modelName].create({
      data: updateDataRelations[i],
    });
    updatedRelations.push(newRelation);
  }

  return updatedRelations; // Retorna a lista de relações atualizadas
};
