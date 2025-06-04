// Importing Request and Response from express, as well as StatusCodes, functions, and interfaces
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { customerProvider } from '../../database/providers/CustomerProvider';
import { ICustomers } from '../../database/models/CustomersInterface';
import { IPaymentAccount } from '../../database/models/PaymentAccount';
import { paymentAccountProvider } from '../../database/providers/PaymentAccountProvider';

// Declaring the query interface
interface IQuery {
  id?: string;
  bankName?: string;
}

// Exporting the function to fetch paymentAccount
export const get = async (
  req: Request<{}, {}, {}, IQuery>,
  res: Response
): Promise<any> => {
  // Destructuring query from the request
  const { query } = req;

  // Fetches paymentAccount, returning a list of IPaymentAccount or an erro
  const getPaymentAccount: IPaymentAccount | Error =
    await paymentAccountProvider.get(query);

  // Validating if getPaymentAccount is an instance of an error, and if so, returning an error immediately
  if (getPaymentAccount instanceof Error) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: getPaymentAccount.message });
  }

  // Returning paymentAccount if everything is successful
  return res
    .status(StatusCodes.OK)
    .json({ paymentAccountListed: getPaymentAccount });
};
