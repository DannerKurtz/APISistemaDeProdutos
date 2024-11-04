import { Request, Response } from "express";
import { userProvider } from "../../database/providers/UserProvider";
import { StatusCodes } from "http-status-codes";

interface IFilter {
  id: String;
  nome: string;
}
export const get = async (
  req: Request<{}, {}, {}, IFilter>,
  res: Response
): Promise<any> => {
  const users = await userProvider.get(req.query.id, req.query.nome);

  if (users instanceof Error) {
    return res.status(StatusCodes.NOT_FOUND).json({ users });
  }

  return res.status(StatusCodes.OK).json({ users });
};
