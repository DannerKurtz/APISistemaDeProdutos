import { crudService } from "../../../shared/services/CRUD";

export const deleteClient = async (id: string): Promise<Error | Boolean> => {
  try {
    return await crudService.deleteInDatabase(
      id,
      "clientes",
      "Erro ao deletar o cliente"
    );
  } catch (error) {
    return new Error("Erro ao acessar o crudService para deletar o cliente!");
  }
};
