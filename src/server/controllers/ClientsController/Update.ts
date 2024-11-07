import { Request, Response } from "express";
import { IClient } from "../../database/models/ClientModel";
import { clientsProvider } from "../../database/providers/ClientsProvider";
import { StatusCodes } from "http-status-codes";

interface IParams {
  id: string;
}

interface IBodyProps extends Omit<IClient, "id"> {}

export const update = async (
  req: Request<IParams, {}, IBodyProps>,
  res: Response
): Promise<any> => {
  const id = req.params.id;
  const data = req.body;

  const updateClient = await clientsProvider.update(id, data);

  if (updateClient instanceof Error) {
    return res.status(StatusCodes.BAD_REQUEST).json(updateClient);
  }

  return res.status(StatusCodes.OK).json({
    updateClient,
  });
};
