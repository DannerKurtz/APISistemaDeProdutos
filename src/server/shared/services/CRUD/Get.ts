import { prisma } from "../../../database/prisma";

type Query = {
  id?: string;
  nome?: string | object;
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

    if (query.nome) {
      whereClause.nome = {
        contains: String(query.nome),
        mode: "insensitive",
      };
    }
    return await (prisma as any)[modelName].findMany({
      where: whereClause,
    });
  } catch (error) {
    return new Error(message);
  }
};
