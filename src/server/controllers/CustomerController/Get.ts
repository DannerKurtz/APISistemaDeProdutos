import { Request, Response } from 'express';
import { clientsProvider } from '../../database/providers/ClientsProvider';
import { StatusCodes } from 'http-status-codes';
import { ICustomers } from '../../database/models/CustomersInterface';

interface IQuery {
  id?: string;
  nome?: string;
}

export const get = async (
  req: Request<{}, {}, {}, IQuery>,
  res: Response
): Promise<any> => {
  const query: IQuery = req.query;

  const getCostumers: ICustomers | Error = await clientsProvider.get(query);

  if (getCostumers instanceof Error) {
    return res.status(StatusCodes.NOT_FOUND).json(getCostumers);
  }

  return res.status(StatusCodes.OK).json(getCostumers);
};
