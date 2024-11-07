import { Request, Response } from "express";
import { rawMaterialProvider } from "../../database/providers/RawMaterialProvider";
import { StatusCodes } from "http-status-codes";

type IParams = {
  id: string;
};
export const deleteRawMaterial = async (
  req: Request<IParams>,
  res: Response
): Promise<any> => {
  const params = req.params.id;

  const deleteRawMaterialResult = await rawMaterialProvider.deleteRawMaterial(
    params
  );

  if (deleteRawMaterialResult instanceof Error) {
    return res.status(StatusCodes.BAD_REQUEST).json(deleteRawMaterialResult);
  }

  return res.status(StatusCodes.OK).json(deleteRawMaterialResult);
};
