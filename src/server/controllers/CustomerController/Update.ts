import { Request, Response } from 'express';
import { clientsProvider } from '../../database/providers/CustomerProvider';
import { StatusCodes } from 'http-status-codes';
import {
  ICustomers,
  ICustomersWithoutId,
} from '../../database/models/CustomersInterface';

interface IParams {
  id: string;
}

export const update = async (
  req: Request<IParams, {}, ICustomersWithoutId>,
  res: Response
): Promise<any> => {
  const id: string = req.params.id;
  const data: ICustomersWithoutId = req.body;

  const updatedCustomer: ICustomers | Error = await clientsProvider.update(
    id,
    data
  );

  if (updatedCustomer instanceof Error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: updatedCustomer.message });
  }

  return res.status(StatusCodes.OK).json({
    customerUpdated: updatedCustomer,
  });
};
