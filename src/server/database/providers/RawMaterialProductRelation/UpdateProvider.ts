import { crudService } from '../../../shared/services/CRUD';
import { RawMaterialProductRelationModel } from '../../models/RawMaterialProductRelationsInterface';

type IBodyWithoutId = Omit<RawMaterialProductRelationModel, 'id'>;

export const update = async (
  id: string,
  data: IBodyWithoutId
): Promise<RawMaterialProductRelationModel | Error> => {
  try {
    const updateRawMaterialProductRelation = await crudService.updateInDatabase(
      id,
      data,
      'RelacaoMateriaPrimaEProdutos',
      'Erro ao atualizar a relação de materia prima e produto'
    );

    if (updateRawMaterialProductRelation instanceof Error)
      return new Error(updateRawMaterialProductRelation.message);

    return updateRawMaterialProductRelation;
  } catch (error) {
    return new Error(
      'Erro ao acessar o crudService para atualizar a relação de materia prima e produto!'
    );
  }
};
