// Necessary imports
import { Request, Response } from 'express';
import { productProvider } from '../../database/providers/ProductProvier';
import { StatusCodes } from 'http-status-codes';

// Exporting the function responsible for the DELETE method
export const deleteProduct = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<any> => {
  // Destructuring the id from the request params
  const { id } = req.params;

  // Calling the provider responsible for deleting, returning boolean or Error
  const productDelete: Boolean | Error = await productProvider.deleteProduct(
    id
  );

  // Validates if productDelete is an error, and if so, returns the error
  if (productDelete instanceof Error)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: productDelete.message });

  // Returns if the product was deleted
  return res.status(StatusCodes.OK).json({ productDeleted: productDelete });
};
