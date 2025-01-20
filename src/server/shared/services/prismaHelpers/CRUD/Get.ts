// Import of Prisma
import { prisma } from '../../../../database/prisma';

// Definition of the query type
type Query = {
  id?: string;
  name?: string | object;
};

// Export of the function that retrieves information from the database
export const getInDatabase = async <T>(
  query: Query,
  modelName: string,
  message: string
): Promise<Error | T> => {
  try {
    // Definition of the where clause
    const whereClause: any = {};

    // Checks if query has an id, if it does, defines the whereClause with the id
    // and returns by calling Prisma and searching for the first record with that id
    if (query.id) {
      whereClause.id = query.id;
      return await (prisma as any)[modelName].findFirst({
        where: whereClause,
      });
    }

    // If the query has a name, defines the whereClause to search for the name in an insensitive manner
    // and returns the Prisma call to find all records containing that name
    if (query.name) {
      whereClause.name = {
        contains: String(query.name),
        mode: 'insensitive',
      };
    }

    // Returns the search for all records
    return await (prisma as any)[modelName].findMany({
      where: whereClause,
    });
  } catch (error) {
    // Returns the error in case of an exception
    return new Error(message);
  }
};
