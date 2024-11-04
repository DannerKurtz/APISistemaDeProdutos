import { Request, Response } from "express";
import { userModel } from "../../database/models/UserModel";
import { userProvider } from "../../database/providers/UserProvider";
import { StatusCodes } from "http-status-codes";

interface IBodyProps extends Omit<userModel, "id"> {}

export const create = async (
  req: Request<{}, {}, IBodyProps>,
  res: Response
): Promise<any> => {
  const newUser = await userProvider.create(req.body);
  if (newUser instanceof Error) {
    return res.status(StatusCodes.CONFLICT).json(newUser.message);
  }

  return res
    .status(StatusCodes.CREATED)
    .json({ id: newUser.id, nome: newUser.nome });
};
