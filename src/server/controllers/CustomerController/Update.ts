// Necessary imports
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { clientsProvider } from '../../database/providers/CustomerProvider';
import {
  ICustomers,
  ICustomersWithoutId,
} from '../../database/models/CustomersInterface';

// Definition of the parameters interface
interface IParams {
  id: string;
}

// Exporting the function responsible for the PUT method
export const update = async (
  req: Request<IParams, {}, ICustomersWithoutId>,
  res: Response
): Promise<any> => {
  // Destructuring the id from request params and the body from request
  const { id } = req.params;
  const { body } = req;

  // Calls the provider to update the customer, returning the updated customer or an error
  const updatedCustomer: ICustomers | Error = await clientsProvider.update(
    id,
    body
  );

  // Validating if updatedCustomer is an instance of an error, if so, it returns the error
  if (updatedCustomer instanceof Error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: updatedCustomer.message });
  }

  // Returning the updated customer
  return res.status(StatusCodes.OK).json({
    customerUpdated: updatedCustomer,
  });
};
