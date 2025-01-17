// Importações necessárias
import { crudService } from '../../../shared/services/CRUD';
import {
  errorsCrudService,
  errorsProvider,
} from '../../../shared/services/messageErrors';
import {
  IRawMaterials,
  IRawMaterialsWithoutId,
} from '../../models/RawMaterialsInterface';

// Exportação da função responsável por atualizar a materia prima
export const update = async (
  id: string,
  data: IRawMaterialsWithoutId
): Promise<IRawMaterials | Error> => {
  try {
    //Chamada da função crudService responsável por atualizar
    const updateRawMaterial: IRawMaterials | Error =
      await crudService.updateInDatabase(
        id,
        data,
        'RawMaterials',
        errorsCrudService.updateMessage('RawMaterials')
      );

    //Retorna a materia prima atualizada ou erro
    return updateRawMaterial;
  } catch (error) {
    // Retorna erro caso haja exceção
    return new Error(errorsProvider.updateMessage('RawMaterials'));
  }
};
