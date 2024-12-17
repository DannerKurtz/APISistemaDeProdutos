import { Request, Response } from 'express';
import { clientsProvider } from '../../database/providers/ClientsProvider';
import { StatusCodes } from 'http-status-codes';
import { ICustomersWithoutId } from '../../database/models/CustomersInterface';

export const create = async (
  req: Request<{}, {}, ICustomersWithoutId>,
  res: Response
): Promise<any> => {
  const newClient = await clientsProvider.create(req.body);

  if (newClient instanceof Error) {
    return res.status(StatusCodes.CONFLICT).json(newClient);
  }

  return res.status(StatusCodes.CREATED).json({ newClient });
};
