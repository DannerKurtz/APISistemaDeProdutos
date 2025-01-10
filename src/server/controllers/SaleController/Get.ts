// Necessary import
import { Request, Response } from 'express';
import { saleProvider } from '../../database/providers/SaleProvider';
import { StatusCodes } from 'http-status-codes';
import { ISales } from '../../database/models/SalesInterface';

// Definition of the query interface
interface IQuery {
  id: string;
  saleNumber: string;
  customerName: string;
}

// Exporting the function responsible for the GET method
export const get = async (
  req: Request<{}, {}, {}, IQuery>,
  res: Response
): Promise<any> => {
  // Destructuring the query from the request
  const query = req.query;

  // Calling the provider responsible for sales, returning a list or error
  const sales: (ISales | ISales[]) | Error = await saleProvider.get(query);

  // Validating if it's an error and returning the message
  if (sales instanceof Error) {
    return res.status(StatusCodes.NOT_FOUND).json({ error: sales.message });
  }

  // Returning the list of sales
  return res.status(StatusCodes.OK).json({ saleListed: sales });
};
