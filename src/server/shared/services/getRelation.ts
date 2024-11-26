import { prisma } from '../../database/prisma';

type queryOptions = {
  id: string;
  modelName: string;
  conditionKey: string;
  selectKey: string;
  message: string;
};

export const getRelationById = async <T>(
  queryOptions: queryOptions
): Promise<T | Error> => {
  try {
    const relation = await (prisma as any)[queryOptions.modelName].findMany({
      where: { [queryOptions.conditionKey]: queryOptions.id },
      select: {
        [queryOptions.selectKey]: { select: { nome: true, quantidade: true } },
      },
    });

    if (relation instanceof Error) return new Error(relation.message);

    return relation;
  } catch (error) {
    return new Error(queryOptions.message);
  }
};
