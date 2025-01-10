// Necessary imports
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { userProvider } from '../../database/providers/UserProvider';

// Definition of the params interface
interface IParams {
  id: string;
}

// Export of the function responsible for the DELETE method
export const deleteUser = async (
  req: Request<IParams>,
  res: Response
): Promise<any> => {
  // Call to the provider, passing the id, returning boolean or error
  const userDelete: Boolean | Error = await userProvider.deleteUser(
    req.params.id
  );

  // Validation: if it's an error, return the message
  if (userDelete instanceof Error) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: userDelete.message });
  }

  // Return whether the user was deleted
  return res.status(StatusCodes.OK).json({ userDeleted: userDelete });
};
