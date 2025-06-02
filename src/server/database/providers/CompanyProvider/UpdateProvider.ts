// Necessary import
import { crudService } from '../../../shared/services/prismaHelpers/CRUD';
import {
  errorsCrudService,
  errorsProvider,
} from '../../../shared/services/messageErrors';
import { ICompany, ICompanyWithoutId } from '../../models/CompanyInterface';

// Exporting the function responsible for updating
export const update = async (
  id: string,
  data: ICompanyWithoutId
): Promise<ICompany | Error> => {
  try {
    // Calling the CrudService function that updates the customer in the database
    const updateCompany: ICompany | Error = await crudService.updateInDatabase(
      id,
      data,
      'Company',
      errorsCrudService.updateMessage('Company')
    );

    // Returning the response from updateCompany
    return updateCompany;
  } catch (error) {
    // Returning if an exception occurs
    return new Error(errorsProvider.updateMessage('Company'));
  }
};
