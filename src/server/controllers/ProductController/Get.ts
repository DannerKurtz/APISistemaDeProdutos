import { Request, Response } from 'express';
import { productProvider } from '../../database/providers/ProductProvier';
import { StatusCodes } from 'http-status-codes';
import { IProducts } from '../../database/models/ProductsInterface';

type IQuery = {
  id?: string;
  nome?: string | object;
};

export const get = async (
  req: Request<{}, {}, {}, IQuery>,
  res: Response
): Promise<any> => {
  const query: IQuery = req.query;
  const product: IProducts | Error = await productProvider.get(query);

  if (product instanceof Error)
    return res.status(StatusCodes.BAD_REQUEST).json({ error: product.message });

  return res.status(StatusCodes.OK).json({ productListed: product });
};
