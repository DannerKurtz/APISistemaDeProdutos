import { crudService } from '../../../shared/services/CRUD';
import { RawMaterialProductRelationModel } from '../../models/RawMaterialProductRelation';

type RawMaterialProductRelationWithoutId = Omit<
  RawMaterialProductRelationModel,
  'id'
>;

export const create = async (data: RawMaterialProductRelationWithoutId) => {
  try {
    const newRawMaterialProductRelation = await crudService.createInDatabase(
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
