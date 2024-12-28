import { prisma } from '../../../database/prisma';

export const updateRelations = async <T>(
  modelName: string,
  whereCondition: object,
  updateData: T[]
): Promise<T[]> => {
  // Buscar as relações existentes
  const relations = await (prisma as any)[modelName].findMany({
    where: whereCondition,
  });

  const updatedRelations: T[] = [];

  // Atualizar cada relação encontrada
  for (let i = 0; i < relations.length; i++) {
    const updatedRelation = await (prisma as any)[modelName].update({
      where: { id: relations[i].id },
      data: updateData[i], // Supondo que `updateData` seja um array
    });

    updatedRelations.push(updatedRelation);
  }

  return updatedRelations; // Retorna a lista de relações atualizadas
};
