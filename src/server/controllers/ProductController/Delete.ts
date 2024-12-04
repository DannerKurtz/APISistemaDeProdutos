import { Request, Response } from 'express';
import { productProvider } from '../../database/providers/ProductProvier';
import { StatusCodes } from 'http-status-codes';

export const deleteProduct = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<any> => {
  const id = req.params.id;

  const productDelete = await productProvider.deleteProduct(id);

  if (productDelete instanceof Error)
    return res.status(StatusCodes.BAD_REQUEST).json(productDelete.message);

  return res.status(StatusCodes.OK).json(productDelete);
};
