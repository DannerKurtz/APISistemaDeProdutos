// Importing Request and Response from express, as well as StatusCodes, functions, and interfaces
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { clientsProvider } from '../../database/providers/CustomerProvider';
import { ICustomers } from '../../database/models/CustomersInterface';

// Declaring the query interface
interface IQuery {
  id?: string;
  nome?: string;
}

// Exporting the function to fetch customers
export const get = async (
  req: Request<{}, {}, {}, IQuery>,
  res: Response
): Promise<any> => {
  // Destructuring query from the request
  const { query } = req;

  // Fetches customers, returning a list of ICustomers or an erro
  const getCustomers: ICustomers | Error = await clientsProvider.get(query);

  // Validating if getCustomers is an instance of an error, and if so, returning an error immediately
  if (getCustomers instanceof Error) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: getCustomers.message });
  }

  // Returning customers if everything is successful
  return res.status(StatusCodes.OK).json({ customerListed: getCustomers });
};
