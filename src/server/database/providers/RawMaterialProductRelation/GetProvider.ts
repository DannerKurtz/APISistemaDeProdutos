import { crudService } from '../../../shared/services/CRUD';
import { RawMaterialProductRelationModel } from '../../models/RawMaterialProductRelationsInterface';

export const get = async (
  id: string
): Promise<RawMaterialProductRelationModel | Error> => {
  try {
    const getRawMaterialProductRelation:
      | RawMaterialProductRelationModel
      | Error = await crudService.getInDatabase(
      { id },
      'RelacaoMateriaPrimaEProdutos',
      'Erro ao buscar a relação de materia prima e produto!'
    );

    if (getRawMaterialProductRelation instanceof Error)
      return new Error(getRawMaterialProductRelation.message);

    return getRawMaterialProductRelation;
  } catch (error) {
    return new Error(
      'Erro ao acessar o crudService para buscar a relação de materia prima e produto!'
    );
  }
};
