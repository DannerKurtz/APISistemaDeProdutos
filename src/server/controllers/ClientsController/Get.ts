import { Request, Response } from 'express';
import { clientsProvider } from '../../database/providers/ClientsProvider';
import { StatusCodes } from 'http-status-codes';

interface IQuery {
  id?: string;
  nome?: string;
}

export const get = async (
  req: Request<{}, {}, {}, IQuery>,
  res: Response
): Promise<any> => {
  const { id, nome } = req.query;

  const getClient = await clientsProvider.get(id, nome);

  if (getClient instanceof Error) {
    return res.status(StatusCodes.NOT_FOUND).json(getClient);
  }

  return res.status(StatusCodes.OK).json({ getClient });
};
