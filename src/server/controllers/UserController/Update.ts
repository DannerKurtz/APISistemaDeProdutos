import { Request, Response } from "express";
import { userModel } from "../../database/models/UserModel";
import { userProvider } from "../../database/providers/UserProvider";
import { StatusCodes } from "http-status-codes";

interface IBodyProps extends Omit<userModel, "id"> {
  novaSenha?: string;
}
interface IParams {
  id: String;
}
export const update = async (
  req: Request<IParams, {}, IBodyProps>,
  res: Response
): Promise<any> => {
  const userUpdate = await userProvider.update(String(req.params.id), req.body);

  if (userUpdate instanceof Error) {
    return res.status(StatusCodes.NOT_FOUND).json({ userUpdate });
  }
  return res.status(StatusCodes.OK).json({ userUpdate });
};
