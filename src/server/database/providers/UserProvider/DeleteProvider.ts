import { crudService } from "../../../shared/services/CRUD";

export const deleteUser = async (id: string): Promise<Error | Boolean> => {
  try {
    return await crudService.deleteInDatabase(
      id,
      "usuarios",
      "Erro ao deletar o usuário"
    );
  } catch (error) {
    return new Error("Erro ao acessar o crudService para deletar o usuário!");
  }
};
