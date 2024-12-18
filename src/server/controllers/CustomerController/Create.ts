import { Request, Response } from 'express';
import { clientsProvider } from '../../database/providers/CustomerProvider';
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
    return res
      .status(StatusCodes.CONFLICT)
      .json({ error: newCustomer.message });
  }

  return res.status(StatusCodes.CREATED).json({ customerCreated: newCustomer });
};
