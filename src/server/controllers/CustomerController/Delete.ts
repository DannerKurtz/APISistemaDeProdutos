// Importing Request and Response from express, the provider, and StatusCode
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { clientsProvider } from '../../database/providers/CustomerProvider';

// Definition of the interface for parameters
interface IParams {
  id: string;
}

// Exporting the function responsible for the DELETE method
export const deleteCustomer = async (
  req: Request<IParams>,
  res: Response
): Promise<any> => {
  // Extracting the id from the request parameters
  const { id } = req.params;

  // Calls the provider to delete the customer, returning a boolean or an error
  const deletedCustomer: Boolean | Error = await clientsProvider.deleteClient(
    id
  );

  // Verifying if deletedCustomer is an instance of an error, if so, it throws an error
  if (deletedCustomer instanceof Error) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: deletedCustomer.message });
  }

  // Returning if the customer is deleted
  return res.status(StatusCodes.OK).json({ customerDeleted: deletedCustomer });
};
