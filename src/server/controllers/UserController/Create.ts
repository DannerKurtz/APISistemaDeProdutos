// Necessary imports
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IUsers, IUsersWithoutId } from '../../database/models/UsersInterface';
import { userProvider } from '../../database/providers/UserProvider';

// Export of the function required for the POST method
export const create = async (
  req: Request<{}, {}, IUsersWithoutId>,
  res: Response
): Promise<any> => {
  // Destructuring the body from the request
  const { body } = req;

  // Calling the provider to create the user
  const newUser: IUsers | Error = await userProvider.create(body);

  // Validation: if it's an error, return the message
  if (newUser instanceof Error) {
    return res.status(StatusCodes.CONFLICT).json({ error: newUser.message });
  }

  // Validation: if it's an error, return the message
  return res
    .status(StatusCodes.CREATED)
    .json({ userCreated: { id: newUser.id, name: newUser.name } });
};
