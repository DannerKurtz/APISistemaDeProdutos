// Necessary imports
import { Request, Response } from 'express';
import { IUsers, IUsersWithoutId } from '../../database/models/UsersInterface';
import { userProvider } from '../../database/providers/UserProvider';
import { StatusCodes } from 'http-status-codes';

// Definition of interfaces, to add newPassword and params
interface IData extends Omit<IUsersWithoutId, 'password'> {
  newPassword: string;
}
interface IResultUsers extends Omit<IUsers, 'password'> {}
interface IParams {
  id: string;
}

// Export the function responsible for the PUT method
export const update = async (
  req: Request<IParams, {}, IData>,
  res: Response
): Promise<any> => {
  // Call the provider responsible for updating users or returning an error
  const userUpdate: IResultUsers | Error = await userProvider.update(
    String(req.params.id),
    req.body
  );

  // Validation: if it’s an error, return the message
  if (userUpdate instanceof Error) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: userUpdate.message });
  }

  // Return the updated user
  return res.status(StatusCodes.OK).json({ userUpdated: userUpdate });
};
