import { crudService } from '../../../shared/services/CRUD';
import { RawMaterialModel } from '../../models/RawMaterialsInterface';

type TWithoutID = Omit<RawMaterialModel, 'id'>;

export const create = async (
  data: TWithoutID
): Promise<Error | RawMaterialModel> => {
  try {
    return await crudService.createInDatabase(
      data,
      'MateriasPrimas',
      'Erro ao ciar nova materia prima'
    );
  } catch (error) {
    return new Error(
      'Erro ao acessar o crudService para criar nova materia prima!'
    );
  }
};
