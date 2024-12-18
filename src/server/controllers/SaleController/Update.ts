import { Request, Response } from 'express';
import { ISalesWithoutId } from '../../database/models/SalesInterface';
import { StatusCodes } from 'http-status-codes';
import { saleProvider } from '../../database/providers/SaleProvider';

type IParams = {
  id: string;
};

export const update = async (
  req: Request<IParams, {}, ISalesWithoutId>,
  res: Response
): Promise<any> => {
  const id: string = req.params.id;
  const body: ISalesWithoutId = req.body;

  const updateSale = await saleProvider.update(id, body);

  if (updateSale instanceof Error)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: updateSale.message });

  return res.status(StatusCodes.OK).json({ saleUpdated: updateSale });
};
