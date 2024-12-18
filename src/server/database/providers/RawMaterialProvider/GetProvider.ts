import { crudService } from '../../../shared/services/CRUD';
import {
  errorsCrudService,
  errorsProvider,
} from '../../../shared/services/messageErrors';
import { IRawMaterials } from '../../models/RawMaterialsInterface';

type IQuery = {
  id?: string;
  nome?: string | object;
};

export const get = async (query: IQuery): Promise<IRawMaterials | Error> => {
  try {
    const getRawMaterials: IRawMaterials | Error =
      await crudService.getInDatabase(
        query,
        'RawMaterials',
        errorsCrudService.getMessage('RawMaterials')
      );

    return getRawMaterials;
  } catch (error) {
    return new Error(errorsProvider.getMessage('RawMaterials'));
  }
};
