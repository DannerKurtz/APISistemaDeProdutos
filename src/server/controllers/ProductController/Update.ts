// Necessary imports
import { Request, Response } from 'express';
import { productProvider } from '../../database/providers/ProductProvier';
import { StatusCodes } from 'http-status-codes';
import {
  IProducts,
  IProductsWithoutId,
} from '../../database/models/ProductsInterface';

// Exporting the function responsible for the PUT method
export const update = async (
  req: Request<{ id: string }, {}, IProductsWithoutId>,
  res: Response
): Promise<any> => {
  // Destructuring the id from params and the body from the request
  const { id } = req.params;
  const { body } = req;

  //  Calling the provider that updates the product, returning the updated product or error
  const updateProduct: IProducts | Error = await productProvider.update(
    id,
    body
  );

  // Validating if updateProduct is an instance of error, if so, return the error
  if (updateProduct instanceof Error)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: updateProduct.message });

  // Returning the updated product
  return res.status(StatusCodes.OK).json({ productUpdated: updateProduct });
};
