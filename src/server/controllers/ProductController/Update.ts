import { Request, Response } from 'express';
import { productProvider } from '../../database/providers/ProductProvier';
import { StatusCodes } from 'http-status-codes';
import {
  IProducts,
  IProductsWithoutId,
} from '../../database/models/ProductsInterface';

export const update = async (
  req: Request<{ id: string }, {}, IProductsWithoutId>,
  res: Response
): Promise<any> => {
  const id: string = req.params.id;
  const body: IProductsWithoutId = req.body;

  const updateProduct: IProducts | Error = await productProvider.update(
    id,
    body
  );

  if (updateProduct instanceof Error)
    return res.status(StatusCodes.BAD_REQUEST).json(updateProduct);

  return res.status(StatusCodes.OK).json(updateProduct);
};
