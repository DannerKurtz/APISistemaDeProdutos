import { prisma } from "../../prisma";

export const deleteClient = async (id: string): Promise<Error | Boolean> => {
  try {
    const deleteClient = await prisma.clientes.delete({ where: { id } });

    if (!deleteClient) {
      return new Error("Erro ao deletar o cliente!");
    }

    return true;
  } catch (error) {
    return new Error("Erro ao deletar o cliente!");
  }
};
