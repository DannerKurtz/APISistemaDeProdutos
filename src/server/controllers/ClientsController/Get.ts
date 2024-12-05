import { Request, Response } from 'express';
import { clientsProvider } from '../../database/providers/ClientsProvider';
import { StatusCodes } from 'http-status-codes';

export const get = async (req: Request, res: Response): Promise<any> => {
  const { id, nome } = req.query;

  const clients = await clientsProvider.get(id, nome);

  if (clients instanceof Error) {
    return res.status(StatusCodes.NOT_FOUND).json(clients);
  }

  return res.status(StatusCodes.OK).json({ clients });
};
