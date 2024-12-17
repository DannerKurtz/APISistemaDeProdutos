import { Request, Response } from 'express';
import { clientsProvider } from '../../database/providers/ClientsProvider';
import { StatusCodes } from 'http-status-codes';
import {
  ICustomers,
  ICustomersWithoutId,
} from '../../database/models/CustomersInterface';

export const create = async (
  req: Request<{}, {}, ICustomersWithoutId>,
  res: Response
): Promise<any> => {
  const newCustomer: ICustomers | Error = await clientsProvider.create(
    req.body
  );

  if (newCustomer instanceof Error) {
    return res.status(StatusCodes.CONFLICT).json(newCustomer);
  }

  return res.status(StatusCodes.CREATED).json(newCustomer);
};
