import { Request, Response } from "express";
import { RawMaterialModel } from "../../database/models/RawMaterialModel";
import { rawMaterialProvider } from "../../database/providers/RawMaterialProvider";
import { StatusCodes } from "http-status-codes";

type TWithoutID = Omit<RawMaterialModel, "id">;
type IParams = {
  id: string;
};
export const update = async (
  req: Request<IParams, {}, TWithoutID>,
  res: Response
): Promise<any> => {
  const params = req.params.id;
  const data = req.body;

  const updateRawMaterial = await rawMaterialProvider.update(params, data);

  if (updateRawMaterial instanceof Error) {
    return res.status(StatusCodes.BAD_REQUEST).json(updateRawMaterial);
  }
  return res.status(StatusCodes.OK).json(updateRawMaterial);
};
