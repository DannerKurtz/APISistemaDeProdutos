import { crudService } from '../../../shared/services/CRUD';
import { RawMaterialProductRelationModel } from '../../models/RawMaterialProductRelationsInterface';

type RawMaterialProductRelationWithoutId = Omit<
  RawMaterialProductRelationModel,
  'id'
>;

export const create = async (
  data: RawMaterialProductRelationWithoutId
): Promise<Error | RawMaterialProductRelationModel> => {
  try {
    const newRawMaterialProductRelation:
      | Error
      | RawMaterialProductRelationModel = await crudService.createInDatabase(
      data,
      'RelacaoMateriaPrimaEProdutos',
      'Erro ao criar nova relação de materia prima e produto'
    );

    if (newRawMaterialProductRelation instanceof Error)
      return newRawMaterialProductRelation;

    return newRawMaterialProductRelation;
  } catch (error) {
    return new Error(
      'Erro ao acessar o crudService para criar nova relação de materia prima e produto!'
    );
  }
};
