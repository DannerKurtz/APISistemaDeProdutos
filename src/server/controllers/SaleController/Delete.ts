import { Request, Response } from 'express';
import { saleProvider } from '../../database/providers/SaleProvider';
import { StatusCodes } from 'http-status-codes';

type IParams = {
  id: string;
};

export const deleteSale = async (
  req: Request<IParams>,
  res: Response
): Promise<any> => {
  const idSale: string = req.params.id;

  const deleteSale: Boolean | Error = await saleProvider.deleteSale(idSale);

  if (deleteSale instanceof Error)
    return res.status(StatusCodes.BAD_REQUEST).json(deleteSale.message);

  return res.status(StatusCodes.OK).json(deleteSale);
};
