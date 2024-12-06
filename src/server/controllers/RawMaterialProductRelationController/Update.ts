import { Request, Response } from 'express';
import { rawMaterialProductRelationProvider } from '../../database/providers/RawMaterialProductRelation';
import { RawMaterialProductRelationModel } from '../../database/models/RawMaterialProductRelation';
import { StatusCodes } from 'http-status-codes';

type IParams = {
  id: string;
};

type IBodyWithoutId = Omit<RawMaterialProductRelationModel, 'id'>;

export const update = async (
  req: Request<IParams, {}, IBodyWithoutId>,
  res: Response
): Promise<any> => {
  const id = req.params.id;
  const data = req.body;

  const updateRawMaterialProductRelation =
    await rawMaterialProductRelationProvider.update(id, data);

  if (updateRawMaterialProductRelation instanceof Error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json(updateRawMaterialProductRelation);
  }
  return res.status(StatusCodes.OK).json(updateRawMaterialProductRelation);
};
