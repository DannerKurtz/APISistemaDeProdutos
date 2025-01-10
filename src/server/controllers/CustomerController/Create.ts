// Importing Request and Response from express, the provider, and the interfaces
import { Request, Response } from 'express';
import { customerProvider } from '../../database/providers/CustomerProvider';
import { StatusCodes } from 'http-status-codes';
import {
  ICustomers,
  ICustomersWithoutId,
} from '../../database/models/CustomersInterface';

// Exporting the function to handle the POST method for creating a customer
export const create = async (
  req: Request<{}, {}, ICustomersWithoutId>,
  res: Response
): Promise<any> => {
  // Calls the provider to create a new customer, returning a customer object or an error
  const newCustomer: ICustomers | Error = await customerProvider.create(
    req.body
  );

  // Checks if there was an error during creation and responds accordingly
  if (newCustomer instanceof Error) {
    return res
      .status(StatusCodes.CONFLICT)
      .json({ error: newCustomer.message });
  }

  // Returns the successfully created customer
  return res.status(StatusCodes.CREATED).json({ customerCreated: newCustomer });
};
