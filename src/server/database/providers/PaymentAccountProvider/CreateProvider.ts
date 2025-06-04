// Necessary imports
import { crudService } from '../../../shared/services/prismaHelpers/CRUD';
import {
  errorsCrudService,
  errorsProvider,
} from '../../../shared/services/messageErrors';
import {
  IPaymentAccount,
  IPaymentAccountWithoutId,
} from '../../models/PaymentAccount';

// Exporting the function responsible for creation
export const create = async (
  data: IPaymentAccountWithoutId
): Promise<IPaymentAccount | Error> => {
  try {
    // Calling the crudService function responsible for creating the paymentAccount in the database
    const newPaymentAccount: IPaymentAccount | Error =
      await crudService.createInDatabase(
        data,
        'PaymentAccount',
        errorsCrudService.createMessage('PaymentAccount')
      );

    // Returning the response with the new paymentAccount created
    return newPaymentAccount;
  } catch (error) {
    // Returning the error if something goes wrong
    return new Error(errorsProvider.createMessage('PaymentAccount'));
  }
};
