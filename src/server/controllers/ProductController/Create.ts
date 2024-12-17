import { Request, Response } from 'express';
import { productProvider } from '../../database/providers/ProductProvier';
import { StatusCodes } from 'http-status-codes';
import {
  IProducts,
  IProductsWithoutId,
} from '../../database/models/ProductsInterface';

export const create = async (
  req: Request<{}, {}, IProductsWithoutId>,
  res: Response
): Promise<any> => {
  const data:IProductsWithoutId = req.body;

  const newProduct: IProducts | Error = await productProvider.create(data);

  if (newProduct instanceof Error) {
    return res.status(StatusCodes.BAD_REQUEST).json(newProduct.message);
  }

  return res.status(StatusCodes.CREATED).json(newProduct);
};
