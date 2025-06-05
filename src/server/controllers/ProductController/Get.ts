// Necessary imports
import { Request, Response } from 'express';
import { productProvider } from '../../database/providers/ProductProvier';
import { StatusCodes } from 'http-status-codes';
import { IProducts } from '../../database/models/ProductsInterface';

// Declaration of the query interface
interface IQuery {
  id?: string;
  name?: string;
}
// Exporting the function responsible for the GET method
export const get = async (
  req: Request<{}, {}, {}, IQuery>,
  res: Response
): Promise<any> => {
  // Destructuring the query from the request
  const { query } = req;

  // Calling the provider responsible for fetching the products or returning an error
  const product: IProducts | IProducts[] | Error = await productProvider.get(
    query
  );

  // Validates if product is an instance of an error, and if so, returns the error
  if (product instanceof Error)
    return res.status(StatusCodes.BAD_REQUEST).json({ error: product.message });

  // Returns the list of products
  return res.status(StatusCodes.OK).json({ productListed: product });
};
