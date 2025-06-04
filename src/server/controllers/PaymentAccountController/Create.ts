// Necessary imports
import { Request, Response } from 'express';

import { StatusCodes } from 'http-status-codes';
import {
  IProducts,
  IProductsWithoutId,
} from '../../database/models/ProductsInterface';
import { paymentAccountProvider } from '../../database/providers/PaymentAccountProvider';
import {
  IPaymentAccount,
  IPaymentAccountWithoutId,
} from '../../database/models/PaymentAccount';

// Exporting the function responsible for the POST method
export const create = async (
  req: Request<{}, {}, IPaymentAccountWithoutId>,
  res: Response
): Promise<any> => {
  // Destructuring the request body
  const { body } = req;

  // Calls the provider to create and returns the created product or an error
  const newPaymentAccount: IPaymentAccount | Error =
    await paymentAccountProvider.create(body);

  // Validates if newPaymentAccount is an error, and if so, returns the error
  if (newPaymentAccount instanceof Error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: newPaymentAccount.message });
  }

  // Returns the created product
  return res
    .status(StatusCodes.CREATED)
    .json({ paymentAccountCreated: newPaymentAccount });
};
