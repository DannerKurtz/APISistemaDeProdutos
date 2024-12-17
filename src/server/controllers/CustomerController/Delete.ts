import { Request, Response } from 'express';
import { clientsProvider } from '../../database/providers/ClientsProvider';
import { StatusCodes } from 'http-status-codes';

interface IParams {
  id: string;
}
export const deleteCustomer = async (
  req: Request<IParams>,
  res: Response
): Promise<any> => {
  const id: string = req.params.id;
  const deletedCustomer: Boolean | Error = await clientsProvider.deleteClient(
    id
  );

  if (deletedCustomer instanceof Error) {
    return res.status(StatusCodes.NOT_FOUND).json(deletedCustomer);
  }

  return res.status(StatusCodes.OK).json(deletedCustomer);
};