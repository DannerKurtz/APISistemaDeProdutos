import { crudService } from "../../../shared/services/CRUD";
import { IClient } from "../../models/ClientModel";
import { prisma } from "../../prisma";

interface IBodyProps extends Omit<IClient, "id"> {}

export const create = async (data: IBodyProps): Promise<Error | IClient> => {
  try {
    return await crudService.createInDatabase(
      data,
      "clientes",
      "Erro ao criar um novo cliente"
    );
  } catch (error) {
    return new Error("Erro ao acessar o crudService para criar novo cliente!");
  }
};
