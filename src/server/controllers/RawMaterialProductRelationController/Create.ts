import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { RawMaterialProductRelationModel } from '../../database/models/RawMaterialProductRelation';
import { rawMaterialProductRelationProvider } from '../../database/providers/RawMaterialProductRelation';

type RawMaterialProductRelationWithoutId = Omit<
  RawMaterialProductRelationModel,
  'id'
>;

export const create = async (
  req: Request<{}, {}, RawMaterialProductRelationWithoutId>,
  res: Response
): Promise<any> => {
  const data = req.body;
  const newRelation = await rawMaterialProductRelationProvider.create(data);
  if (newRelation instanceof Error) {
    return res.status(StatusCodes.CONFLICT).json(newRelation);
  }
  return res.status(StatusCodes.CREATED).json(newRelation);
};
