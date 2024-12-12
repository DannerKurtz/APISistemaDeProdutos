import { Request, Response } from 'express';
import { saleProvider } from '../../database/providers/SaleProvider';
import { StatusCodes } from 'http-status-codes';

type IQuery = {
  id: string;
  numeroDaVenda: string;
  nomeDoCliente: string;
};

export const get = async (
  req: Request<{}, {}, {}, IQuery>,
  res: Response
): Promise<any> => {
  const query = req.query;

  const sales = await saleProvider.get(query);

  if (sales instanceof Error) {
    return res.status(StatusCodes.NOT_FOUND).json(sales.message);
  }

  return res.status(StatusCodes.OK).json(sales);
};
