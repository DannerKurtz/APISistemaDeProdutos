import { Request, Response } from 'express';
import { saleProvider } from '../../database/providers/SaleProvider';
import { StatusCodes } from 'http-status-codes';
import { ISales } from '../../database/models/SalesInterface';

type IQuery = {
  id: string;
  saleNumber: string;
  customerName: string;
};

export const get = async (
  req: Request<{}, {}, {}, IQuery>,
  res: Response
): Promise<any> => {
  const query = req.query;

  const sales: (ISales | ISales[]) | Error = await saleProvider.get(query);

  if (sales instanceof Error) {
    return res.status(StatusCodes.NOT_FOUND).json({ error: sales.message });
  }

  return res.status(StatusCodes.OK).json({ saleListed: sales });
};
