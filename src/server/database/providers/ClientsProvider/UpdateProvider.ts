import { crudService } from "../../../shared/services/CRUD";
import { IClient } from "../../models/ClientModel";

type IData = Omit<IClient, "id"> & { novaSenha?: string };

export const update = async (
  id: string,
  data: IData
): Promise<Error | IClient> => {
  try {
    return crudService.updateInDatabase(
      id,
      data,
      "clientes",
      "Erro ao atualizar o cliente"
    );
  } catch (error) {
    return new Error("Erro ao acessar o crudService para atualizar o cliente!");
  }
};
