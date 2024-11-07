import { Request, Response } from "express";
import { rawMaterialProvider } from "../../database/providers/RawMaterialProvider";
import { StatusCodes } from "http-status-codes";

type IQuery = {
  id?: string;
  nome?: string | object;
};

export const get = async (
  req: Request<{}, {}, {}, IQuery>,
  res: Response
): Promise<any> => {
  const { id, nome } = req.query;

  const getRawMaterial = await rawMaterialProvider.get(id, nome);

  if (getRawMaterial instanceof Error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ getRawMaterial });
  }

  return res.status(StatusCodes.OK).json(getRawMaterial);
};
