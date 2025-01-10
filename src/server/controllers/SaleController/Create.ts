// Necessary import
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ISales, ISalesWithoutId } from '../../database/models/SalesInterface';
import { saleProvider } from '../../database/providers/SaleProvider';

// Exporting the function responsible for the POST method
export const create = async (
  req: Request<{}, {}, ISalesWithoutId>,
  res: Response
): Promise<any> => {
  // Destructuring the body from the request
  const { body } = req;

  // Calling the provider that returns the created sale or an error
  const newSale: ISales | Error = await saleProvider.create(body);

  // Checking if it's an error and returning the message
  if (newSale instanceof Error)
    return res.status(StatusCodes.BAD_REQUEST).json({ error: newSale.message });

  // Returning the created sale
  return res.status(StatusCodes.CREATED).json({ saleCreated: newSale });
};
