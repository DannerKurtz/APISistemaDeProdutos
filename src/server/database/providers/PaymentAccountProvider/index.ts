// Import of the functions from the product provider
import * as create from './CreateProvider';
import * as deletePaymentAccount from './DeleteProvider';
import * as get from './GetProvider';
import * as update from './UpdateProvider';

// Export of the variable that contains the functions
export const paymentAccountProvider = {
  ...create,
  ...get,
  ...update,
  ...deletePaymentAccount,
};
