import { Request, Response } from 'express';
import { ISales, ISalesWithoutId } from '../../database/models/SalesInterface';
import { saleProvider } from '../../database/providers/SaleProvider';
import { StatusCodes } from 'http-status-codes';

export const create = async (
  req: Request<{}, {}, ISalesWithoutId>,
  res: Response
): Promise<any> => {
  const data: ISalesWithoutId = req.body;

  const newSale: ISales | Error = await saleProvider.create(data);

  if (newSale instanceof Error)
    return res.status(StatusCodes.BAD_REQUEST).json({ error: newSale.message });

  return res.status(StatusCodes.CREATED).json({ saleCreated: newSale });
};
