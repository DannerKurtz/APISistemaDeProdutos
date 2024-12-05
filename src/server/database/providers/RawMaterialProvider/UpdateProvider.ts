import { crudService } from '../../../shared/services/CRUD';
import { RawMaterialModel } from '../../models/RawMaterialModel';

type TWithoutID = Omit<RawMaterialModel, 'id'>;

export const update = async (id: string, data: TWithoutID) => {
  try {
    return await crudService.updateInDatabase(
      id,
      data,
      'MateriasPrimas',
      'Erro ao atualizar a materia prima'
    );
  } catch (error) {
    return new Error(
      'Erro ao acessar o crudService para atualizar a materia prima!'
    );
  }
};
