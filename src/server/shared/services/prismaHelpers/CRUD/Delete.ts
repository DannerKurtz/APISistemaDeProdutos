// Import of Prisma
import { prisma } from '../../../../database/prisma';

// Export of the function that deletes a record in the database
export const deleteInDatabase = async (
  id: string,
  modelName: string,
  message: string
) => {
  try {
    // Calls Prisma with the provided modelName (table name) and deletes a record based on the ID
    const deleted = await (prisma as any)[modelName].delete({
      where: {
        id,
      },
    });

    // Checks if the record was not deleted and returns an error message
    if (!deleted) {
      return new Error(message);
    }

    // Returns true if the record was successfully deleted
    return true;
  } catch (error) {
    // Returns an error in case of an exception
    return new Error(message);
  }
};
