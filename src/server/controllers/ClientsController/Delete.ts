import { Request, Response } from 'express';
import { clientsProvider } from '../../database/providers/ClientsProvider';
import { StatusCodes } from 'http-status-codes';

interface IParams {
  id: string;
}
export const deleteClient = async (
  req: Request<IParams>,
  res: Response
): Promise<any> => {
  const id = req.params.id;
  const deletedClient = await clientsProvider.deleteClient(id);

  if (deletedClient instanceof Error) {
    return res.status(StatusCodes.NOT_FOUND).json(deletedClient);
  }

  return res.status(StatusCodes.OK).json({ deletedClient });
};
