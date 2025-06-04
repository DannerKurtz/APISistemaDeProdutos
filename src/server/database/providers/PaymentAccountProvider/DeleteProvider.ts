// Necessary imports
import { crudService } from '../../../shared/services/prismaHelpers/CRUD';
import {
  errorsCrudService,
  errorsProvider,
} from '../../../shared/services/messageErrors';

// Exporting the responsible function
export const deletePaymentAccount = async (
  id: string
): Promise<Boolean | Error> => {
  try {
    // Calling the CrudService responsible for deleting the payment account
    const deletedPaymentAccount: Boolean | Error =
      await crudService.deleteInDatabase(
        id,
        'PaymentAccount',
        errorsCrudService.deleteMessage('PaymentAccount')
      );
    // Returning the response with the deleted payment account
    return deletedPaymentAccount;
  } catch (error) {
    // Returning the error if an exception occurs
    return new Error(errorsProvider.deleteMessage('PaymentAccount'));
  }
};
