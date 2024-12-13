import { Request, Response } from 'express';
import { SaleModel } from '../../database/models/SaleModel';
import { StatusCodes } from 'http-status-codes';
import { saleProvider } from '../../database/providers/SaleProvider';

type IParams = {
  id: string;
};

type saleWithoutID = Omit<SaleModel, 'id'>;

export const update = async (
  req: Request<IParams, {}, saleWithoutID>,
  res: Response
): Promise<any> => {
  const id = req.params.id;
  const body = req.body;

  const updateSale = await saleProvider.update(id, body);

  if (updateSale instanceof Error)
    return res.status(StatusCodes.BAD_REQUEST).json(updateSale.message);

  return res.status(StatusCodes.OK).json(updateSale)
};
