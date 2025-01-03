import { Request, Response } from 'express';
import { userProvider } from '../../database/providers/UserProvider';
import { StatusCodes } from 'http-status-codes';

interface IParams {
  id: string;
}

export const deleteUser = async (
  req: Request<IParams>,
  res: Response
): Promise<any> => {
  const userDelete: Boolean | Error = await userProvider.deleteUser(
    req.params.id
  );

  if (userDelete instanceof Error) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: userDelete.message });
  }

  return res.status(StatusCodes.OK).json({ userDeleted: userDelete });
};
