import { crudService } from "../../../shared/services/CRUD";

export const deleteRawMaterial = async (params: string) => {
  try {
    return crudService.deleteInDatabase(
      params,
      "MateriasPrimas",
      "Erro ao deletar materia prima"
    );
  } catch (error) {
    return new Error(
      "Erro ao acessar o crudService para deletar a materia prima!"
    );
  }
};
