import { Request, Response } from 'express';
import { rawMaterialProvider } from '../../database/providers/RawMaterialProvider';
import { StatusCodes } from 'http-status-codes';
import { IRawMaterials } from '../../database/models/RawMaterialsInterface';

type IQuery = {
  id?: string;
  nome?: string | object;
};

export const get = async (
  req: Request<{}, {}, {}, IQuery>,
  res: Response
): Promise<any> => {
  const query: IQuery = req.query;

  const getRawMaterial: IRawMaterials | Error = await rawMaterialProvider.get(
    query
  );

  if (getRawMaterial instanceof Error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: getRawMaterial.message });
  }

  return res.status(StatusCodes.OK).json({ rawMaterialListed: getRawMaterial });
};
