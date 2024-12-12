import { Request, Response } from 'express';
import { SaleModel } from '../../database/models/SaleModel';
import { saleProvider } from '../../database/providers/SaleProvider';
import { StatusCodes } from 'http-status-codes';

type saleWithoutID = Omit<SaleModel, 'id'>;

export const create = async (
  req: Request<{}, {}, saleWithoutID>,
  res: Response
): Promise<any> => {
  const data = req.body;

  const newSale = await saleProvider.create(data);

  if (newSale instanceof Error)
    return res.status(StatusCodes.BAD_REQUEST).json(newSale.message);

  return res.status(StatusCodes.CREATED).json(newSale);
};
