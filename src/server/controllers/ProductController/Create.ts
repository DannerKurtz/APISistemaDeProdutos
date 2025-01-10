// Necessary imports
import { Request, Response } from 'express';
import { productProvider } from '../../database/providers/ProductProvier';
import { StatusCodes } from 'http-status-codes';
import {
  IProducts,
  IProductsWithoutId,
} from '../../database/models/ProductsInterface';

// Exporting the function responsible for the POST method
export const create = async (
  req: Request<{}, {}, IProductsWithoutId>,
  res: Response
): Promise<any> => {
  // Destructuring the request body
  const { body } = req;

  // Calls the provider to create and returns the created product or an error
  const newProduct: IProducts | Error = await productProvider.create(body);

  // Validates if newProduct is an error, and if so, returns the error
  if (newProduct instanceof Error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: newProduct.message });
  }

  // Returns the created product
  return res.status(StatusCodes.CREATED).json({ productCreated: newProduct });
};
