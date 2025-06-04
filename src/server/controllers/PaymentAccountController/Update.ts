// Necessary imports
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import {
  IPaymentAccount,
  IPaymentAccountWithoutId,
} from '../../database/models/PaymentAccount';
import { paymentAccountProvider } from '../../database/providers/PaymentAccountProvider';

// Definition of the parameters interface
interface IParams {
  id: string;
}

// Exporting the function responsible for the PUT method
export const update = async (
  req: Request<IParams, {}, IPaymentAccountWithoutId>,
  res: Response
): Promise<any> => {
  // Destructuring the id from request params and the body from request
  const { id } = req.params;
  const { body } = req;

  // Calls the provider to update the customer, returning the updated customer or an error
  const updatedPaymentAccount: IPaymentAccount | Error =
    await paymentAccountProvider.update(id, body);

  // Validating if updatedPaymentAccount is an instance of an error, if so, it returns the error
  if (updatedPaymentAccount instanceof Error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: updatedPaymentAccount.message });
  }

  // Returning the updated customer
  return res.status(StatusCodes.OK).json({
    paymentAccountUpdated: updatedPaymentAccount,
  });
};
