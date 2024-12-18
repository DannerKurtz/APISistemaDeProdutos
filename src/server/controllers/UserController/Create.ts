import { Request, Response } from 'express';
import { IUsers, IUsersWithoutId } from '../../database/models/UsersInterface';
import { userProvider } from '../../database/providers/UserProvider';
import { StatusCodes } from 'http-status-codes';

export const create = async (
  req: Request<{}, {}, IUsersWithoutId>,
  res: Response
): Promise<any> => {
  const newUser: IUsers | Error = await userProvider.create(req.body);
  if (newUser instanceof Error) {
    return res.status(StatusCodes.CONFLICT).json({ error: newUser.message });
  }

  return res
    .status(StatusCodes.CREATED)
    .json({ userCreated: { id: newUser.id, name: newUser.name } });
};
