// Importing Request and Response from express, the provider, and StatusCode
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { customerProvider } from '../../database/providers/CustomerProvider';
import { paymentAccountProvider } from '../../database/providers/PaymentAccountProvider';

// Definition of the interface for parameters
interface IParams {
  id: string;
}

// Exporting the function responsible for the DELETE method
export const deletePaymentAccount = async (
  req: Request<IParams>,
  res: Response
): Promise<any> => {
  // Extracting the id from the request parameters
  const { id } = req.params;

  // Calls the provider to delete the customer, returning a boolean or an error
  const deletedPaymentAccount: Boolean | Error =
    await paymentAccountProvider.deletePaymentAccount(id);

  // Verifying if deletedPaymentAccount is an instance of an error, if so, it throws an error
  if (deletedPaymentAccount instanceof Error) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: deletedPaymentAccount.message });
  }

  // Returning if the customer is deleted
  return res
    .status(StatusCodes.OK)
    .json({ paymentAccountDeleted: deletedPaymentAccount });
};
