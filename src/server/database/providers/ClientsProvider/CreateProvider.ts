import { IClient } from "../../models/ClientModel";
import { prisma } from "../../prisma";

interface IBodyProps extends Omit<IClient, "id"> {}

export const create = async (data: IBodyProps): Promise<Error | IClient> => {
  try {
    const createNewClient = await prisma.clientes.create({ data });

    if (!createNewClient) {
      return new Error("Erro ao criar um novo cliente!");
    }

    return createNewClient;
  } catch (error) {
    return new Error("Erro ao criar um novo cliente!");
  }
};
