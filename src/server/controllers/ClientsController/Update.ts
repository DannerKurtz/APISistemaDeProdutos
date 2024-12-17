import { Request, Response } from 'express';
import { clientsProvider } from '../../database/providers/ClientsProvider';
import { StatusCodes } from 'http-status-codes';
import { ICustomersWithoutId } from '../../database/models/CustomersInterface';

interface IParams {
  id: string;
}

export const update = async (
  req: Request<IParams, {}, ICustomersWithoutId>,
  res: Response
): Promise<any> => {
  const id = req.params.id;
  const data = req.body;

  const updatedClient = await clientsProvider.update(id, data);

  if (updatedClient instanceof Error) {
    return res.status(StatusCodes.BAD_REQUEST).json(updatedClient);
  }

  return res.status(StatusCodes.OK).json({
    updatedClient,
  });
};
