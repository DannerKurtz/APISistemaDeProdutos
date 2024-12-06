import { crudService } from '../../../shared/services/CRUD';

export const deleteRawMaterialProductRelation = async (
  id: string
): Promise<Boolean | Error> => {
  try {
    return await crudService.deleteInDatabase(
      id,
      'RelacaoMateriaPrimaEProdutos',
      'Erro ao deletar a relação de materia prima e produto'
    );
  } catch (error) {
    return new Error(
      'Erro ao acessar o crudService para deletar a relação de materia prima e produto!'
    );
  }
};
