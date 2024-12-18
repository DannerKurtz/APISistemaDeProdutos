import { Request, Response } from 'express';
import { IUsers, IUsersWithoutId } from '../../database/models/UsersInterface';
import { userProvider } from '../../database/providers/UserProvider';
import { StatusCodes } from 'http-status-codes';

interface IData extends Omit<IUsersWithoutId, 'password'> {
  newPassword: string;
}
interface IResultUsers extends Omit<IUsers, 'password'> {}
interface IParams {
  id: string;
}

export const update = async (
  req: Request<IParams, {}, IData>,
  res: Response
): Promise<any> => {
  const userUpdate: IResultUsers | Error = await userProvider.update(
    String(req.params.id),
    req.body
  );

  if (userUpdate instanceof Error) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: userUpdate.message });
  }
  return res.status(StatusCodes.OK).json({ userUpdated: userUpdate });
};
