import { Request, Response } from 'express';
import { productProvider } from '../../database/providers/ProductProvier';
import { StatusCodes } from 'http-status-codes';

type IQuery = {
  id?: string;
  nome?: string | object;
};

export const get = async (
  req: Request<{}, {}, {}, IQuery>,
  res: Response
): Promise<any> => {
  const query = req.query;
  const product = await productProvider.get(query);

  if (product instanceof Error)
    return res.status(StatusCodes.BAD_REQUEST).json(product);

  return res.status(StatusCodes.OK).json(product);
};
