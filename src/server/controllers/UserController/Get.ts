// Necessary imports
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { userProvider } from '../../database/providers/UserProvider';
import { IUsers } from '../../database/models/UsersInterface';

// Definition of the query interface
interface IQuery {
  id: string;
  nome: string;
}

// Export of the function responsible for the GET method
export const get = async (
  req: Request<{}, {}, {}, IQuery>,
  res: Response
): Promise<any> => {
  // Destructuring the query
  const { query } = req;

  // Call to list the users or return an error
  const users: IUsers | Error = await userProvider.get(query);

  // Validate if it's an error and return the message
  if (users instanceof Error) {
    return res.status(StatusCodes.NOT_FOUND).json({ error: users.message });
  }

  // Return the list of users
  return res.status(StatusCodes.OK).json({ userListed: users });
};
