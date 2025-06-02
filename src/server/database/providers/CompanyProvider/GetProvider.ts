// Necessary imports
import { crudService } from '../../../shared/services/prismaHelpers/CRUD';
import {
  errorsCrudService,
  errorsProvider,
} from '../../../shared/services/messageErrors';
import { ICompany } from '../../models/CompanyInterface';

// Defining the query interface
interface IQuery {
  id?: string;
  nome?: string;
}

// Exporting the function responsible for fetching the company
export const get = async (query: IQuery): Promise<ICompany | Error> => {
  try {
    // Calling the CrudService function to fetch the company from the database
    const getCompany: ICompany | Error = await crudService.getInDatabase(
      query,
      'Company',
      errorsCrudService.getMessage('Company')
    );

    // Returning the response with the fetched company
    return getCompany;
  } catch (error) {
    // Returning if an error exception occurs
    return new Error(errorsProvider.getMessage('Company'));
  }
};
