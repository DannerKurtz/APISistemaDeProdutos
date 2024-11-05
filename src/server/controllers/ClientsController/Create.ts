import { Request, Response } from "express";
import { IClient } from "../../database/models/ClientModel";
import { clientsProvider } from "../../database/providers/ClientsProvider";
import { StatusCodes } from "http-status-codes";

interface IBodyProps extends Omit<IClient, "id"> {}

export const create = async (
  req: Request<{}, {}, IBodyProps>,
  res: Response
): Promise<any> => {
  const newClient = await clientsProvider.create(req.body);

  if (newClient instanceof Error) {
    return res.status(StatusCodes.CONFLICT).json({ newClient });
  }

  return res.status(StatusCodes.CREATED).json({ newClient });
};
