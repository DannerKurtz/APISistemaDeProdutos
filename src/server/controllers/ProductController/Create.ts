import { Request, Response } from 'express';
import { ProductModel } from '../../database/models/ProductModel';
import { productProvider } from '../../database/providers/ProductProvier';
import { StatusCodes } from 'http-status-codes';

type rawMaterial = [{ id: string; quantidade: number }];
type productWithoutID = Omit<ProductModel, 'id'> & { rawMaterial: rawMaterial };

export const create = async (
  req: Request<{}, {}, productWithoutID>,
  res: Response
): Promise<any> => {
  const { rawMaterial, ...data } = req.body;

  const newProduct = await productProvider.create(data, rawMaterial);

  if (newProduct instanceof Error) {
    return res.status(StatusCodes.BAD_REQUEST).json(newProduct.message);
  }

  return res.status(StatusCodes.CREATED).json(newProduct);
};
