// Necessary import
import { crudService } from '../../../shared/services/prismaHelpers/CRUD';
import {
  errorsCrudService,
  errorsProvider,
} from '../../../shared/services/messageErrors';

import {
  IPaymentAccount,
  IPaymentAccountWithoutId,
} from '../../models/PaymentAccount';

// Exporting the function responsible for updating
export const update = async (
  id: string,
  data: IPaymentAccountWithoutId
): Promise<IPaymentAccount | Error> => {
  try {
    // Calling the CrudService function that updates the customer in the database
    const updatePaymentAccount: IPaymentAccount | Error =
      await crudService.updateInDatabase(
        id,
        data,
        'PaymentAccount',
        errorsCrudService.updateMessage('PaymentAccount')
      );

    // Returning the response from updatePaymentAccount
    return updatePaymentAccount;
  } catch (error) {
    // Returning if an exception occurs
    return new Error(errorsProvider.updateMessage('PaymentAccount'));
  }
};
