// Importing create, deletePaymentAccount, get, update
import * as create from './Create';
import * as deletePaymentAccount from './Delete';
import * as get from './Get';
import * as update from './Update';

// Exporting the paymentAccountController to combine all functions
export const paymentAccountController = {
  ...create,
  ...get,
  ...update,
  ...deletePaymentAccount,
};
