import { Request, Response } from 'express';
import { productProvider } from '../../database/providers/ProductProvier';
import { StatusCodes } from 'http-status-codes';

export const deleteProduct = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<any> => {
  const id: string = req.params.id;

  const productDelete: Boolean | Error = await productProvider.deleteProduct(
    id
  );

  if (productDelete instanceof Error)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: productDelete.message });

  return res.status(StatusCodes.OK).json({ productDeleted: productDelete });
};
