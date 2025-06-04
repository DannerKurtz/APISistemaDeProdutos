// Necessary imports
import { crudService } from '../../../shared/services/prismaHelpers/CRUD';
import {
  errorsCrudService,
  errorsProvider,
} from '../../../shared/services/messageErrors';
import { IPaymentAccount } from '../../models/PaymentAccount';

// Defining the query interface
interface IQuery {
  id?: string;
  bankName?: string;
}

// Exporting the function responsible for fetching the payment account
export const get = async (query: IQuery): Promise<IPaymentAccount | Error> => {
  try {
    // Calling the CrudService function to fetch the payment account from the database
    const getPaymentAccount: IPaymentAccount | Error =
      await crudService.getInDatabase(
        query,
        'PaymentAccount',
        errorsCrudService.getMessage('PaymentAccount')
      );

    // Returning the response with the fetched payment account
    return getPaymentAccount;
  } catch (error) {
    // Returning if an error exception occurs
    return new Error(errorsProvider.getMessage('PaymentAccount'));
  }
};
