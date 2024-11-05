import { Request, Response } from "express";
import { clientsProvider } from "../../database/providers/ClientsProvider";
import { StatusCodes } from "http-status-codes";

interface IParams {
  id: string;
}
export const deleteClient = async (
  req: Request<IParams>,
  res: Response
): Promise<any> => {
  const { id } = req.params;
  const deleteClient = await clientsProvider.deleteClient(id);

  if (deleteClient instanceof Error) {
    return res.status(StatusCodes.NOT_FOUND).json({ deleteClient });
  }

  return res.status(StatusCodes.OK).json({ deleteClient });
};
