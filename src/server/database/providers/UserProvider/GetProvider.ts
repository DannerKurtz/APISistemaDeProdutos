import { crudService } from "../../../shared/services/CRUD";

export const get = async (id: string | any, nome: string | any) => {
  try {
    const query = {
      id,
      nome,
    };
    return await crudService.getInDatabase(
      query,
      "usuarios",
      "Erro ao consultar os usuários"
    );
  } catch (err) {
    return new Error("Erro ao acessar o crudService para buscar usuários!");
  }
};
