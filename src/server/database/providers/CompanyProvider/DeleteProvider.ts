// Necessary imports
import { crudService } from '../../../shared/services/prismaHelpers/CRUD';
import {
  errorsCrudService,
  errorsProvider,
} from '../../../shared/services/messageErrors';

// Exporting the responsible function
export const deletedCompany = async (id: string): Promise<Boolean | Error> => {
  try {
    // Calling the CrudService responsible for deleting the client
    const deletedCompany: Boolean | Error =
      await crudService.deleteInDatabase(
        id,
        'Company',
        errorsCrudService.deleteMessage('Company')
      );
    // Returning the response with the deleted customer
    return deletedCompany;
  } catch (error) {
    // Returning the error if an exception occurs
    return new Error(errorsProvider.deleteMessage('Company'));
  }
};
