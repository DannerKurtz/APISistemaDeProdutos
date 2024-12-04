import { Request, Response } from 'express';
import { ProductModel } from '../../database/models/ProductModel';
import { productProvider } from '../../database/providers/ProductProvier';
import { StatusCodes } from 'http-status-codes';

type productWithoutID = Omit<ProductModel, 'id'>;

export const create = async (
  req: Request<{}, {}, productWithoutID>,
  res: Response
): Promise<any> => {
  const data = req.body;

  const newProduct = await productProvider.create(data);

  if (newProduct instanceof Error) {
    return res.status(StatusCodes.BAD_REQUEST).json(newProduct.message);
  }

  return res.status(StatusCodes.CREATED).json(newProduct);
};
