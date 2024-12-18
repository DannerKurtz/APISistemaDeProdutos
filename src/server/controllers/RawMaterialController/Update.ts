import { Request, Response } from 'express';
import {
  IRawMaterials,
  IRawMaterialsWithoutId,
} from '../../database/models/RawMaterialsInterface';
import { rawMaterialProvider } from '../../database/providers/RawMaterialProvider';
import { StatusCodes } from 'http-status-codes';

type IParams = {
  id: string;
};
export const update = async (
  req: Request<IParams, {}, IRawMaterialsWithoutId>,
  res: Response
): Promise<any> => {
  const id: string = req.params.id;
  const data = req.body;

  const updateRawMaterial: IRawMaterials | Error =
    await rawMaterialProvider.update(id, data);

  if (updateRawMaterial instanceof Error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: updateRawMaterial.message });
  }
  return res.status(StatusCodes.OK).json({ rawMaterialUpdated: updateRawMaterial });
};
