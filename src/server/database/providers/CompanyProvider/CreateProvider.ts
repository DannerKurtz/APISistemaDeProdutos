import {
  errorsCrudService,
  errorsProvider,
} from '../../../shared/services/messageErrors';
import { crudService } from '../../../shared/services/prismaHelpers/CRUD';
import { ICompany, ICompanyWithoutId } from '../../models/CompanyInterface';

export const create = async (
  data: ICompanyWithoutId
): Promise<ICompany | Error> => {
  try {
    const newCompany: ICompany | Error = await crudService.createInDatabase(
      data,
      'Company',
      errorsCrudService.createMessage('Company')
    );

    return newCompany;
  } catch (error) {
    return new Error(errorsProvider.createMessage('Company'));
  }
};
