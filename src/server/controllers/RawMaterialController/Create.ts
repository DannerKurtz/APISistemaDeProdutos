import { Request, Response } from "express";
import { RawMaterialModel } from "../../database/models/RawMaterialModel";
import { rawMaterialProvider } from "../../database/providers/RawMaterialProvider";
import { StatusCodes } from "http-status-codes";

type TWithoutID = Omit<RawMaterialModel, "id">;

export const create = async (
  req: Request<{}, {}, TWithoutID>,
  res: Response
): Promise<any> => {
  const data = req.body;

  const createNewData = await rawMaterialProvider.create(data);

  if (createNewData instanceof Error) {
    return res.status(StatusCodes.BAD_REQUEST).json(createNewData);
  }

  return res.status(StatusCodes.CREATED).json(createNewData);
};
