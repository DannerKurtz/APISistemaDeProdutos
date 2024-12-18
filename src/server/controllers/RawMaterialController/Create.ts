import { Request, Response } from 'express';
import { IRawMaterials, IRawMaterialsWithoutId } from '../../database/models/RawMaterialsInterface';
import { rawMaterialProvider } from '../../database/providers/RawMaterialProvider';
import { StatusCodes } from 'http-status-codes';

export const create = async (
  req: Request<{}, {}, IRawMaterialsWithoutId>,
  res: Response
): Promise<any> => {
  const data = req.body;

  const createNewData: IRawMaterials | Error = await rawMaterialProvider.create(
    data
  );

  if (createNewData instanceof Error) {
    return res.status(StatusCodes.BAD_REQUEST).json(createNewData);
  }

  return res.status(StatusCodes.CREATED).json(createNewData);
};
