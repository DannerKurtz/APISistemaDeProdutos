import { crudService } from "../../../shared/services/CRUD";

export const get = async (id: string | any, nome: string | any) => {
  try {
    const query = {
      id,
      nome,
    };
    return await crudService.getInDatabase(
      query,
      "MateriasPrimas",
      "Erro ao buscar a materia prima!"
    );
  } catch (error) {
    return new Error(
      "Erro ao acessar o crudService para buscar a materia prima!"
    );
  }
};
