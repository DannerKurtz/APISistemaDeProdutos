import { prisma } from "../../../database/prisma";

export const deleteInDatabase = async (
  id: string,
  modelName: string,
  message: string
) => {
  try {
    const deleted = await (prisma as any)[modelName].delete({
      where: {
        id,
      },
    });

    if (!deleted) {
      return new Error(message);
    }

    return true;
  } catch (error) {
    return new Error(message);
  }
};
