import { Request, Response } from 'express';
import { userProvider } from '../../database/providers/UserProvider';
import { StatusCodes } from 'http-status-codes';
import { IUsers } from '../../database/models/UsersInterface';

interface IQuery {
  id: string;
  nome: string;
}
export const get = async (
  req: Request<{}, {}, {}, IQuery>,
  res: Response
): Promise<any> => {
  const query: IQuery = req.query;

  const users: IUsers | Error = await userProvider.get(query);

  if (users instanceof Error) {
    return res.status(StatusCodes.NOT_FOUND).json({ error: users.message });
  }

  return res.status(StatusCodes.OK).json({ userListed: users });
};
