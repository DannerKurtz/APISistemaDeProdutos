import { prisma } from '../../../../database/prisma';

type Query = {
  id?: string;
  name?: string | object;
};

export const getInDatabase = async <T>(
  query: Query,
  modelName: string,
  message: string
): Promise<Error | T> => {
  try {
    const whereClause: any = {};
    if (query.id) {
      whereClause.id = query.id;

      return await (prisma as any)[modelName].findFirst({
        where: whereClause,
      });
    }

    if (query.name) {
      whereClause.name = {
        contains: String(query.name),
        mode: 'insensitive',
      };
    }
    return await (prisma as any)[modelName].findMany({
      where: whereClause,
    });
  } catch (error) {
    return new Error(message);
  }
};
