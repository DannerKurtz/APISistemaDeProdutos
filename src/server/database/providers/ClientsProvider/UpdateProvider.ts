import { IClient } from "../../models/ClientModel";
import { prisma } from "../../prisma";

interface IData extends Omit<IClient, "id"> {}

export const update = async (
  id: string,
  data: IData
): Promise<Error | IClient> => {
  try {
    const updateClient = await prisma.clientes.update({ where: { id }, data });

    if (!updateClient) {
      return new Error("Erro ao atualizar o cliente!");
    }

    return updateClient;
  } catch (error) {
    return new Error("Erro ao atualizar o cliente!");
  }
};
