import { Request, Response } from 'express';
import { rawMaterialProductRelationProvider } from '../../database/providers/RawMaterialProductRelationProvider';
import { StatusCodes } from 'http-status-codes';
import { IRawMaterialProductRelations } from '../../database/models/RawMaterialProductRelationsInterface';

type Query = {
  id: string;
};

export const get = async (
  req: Request<{}, {}, {}, Query>,
  res: Response
): Promise<any> => {
  const id: string = req.query.id;

  const rawMaterialProductRelation: IRawMaterialProductRelations | Error =
    await rawMaterialProductRelationProvider.get(id);

  if (rawMaterialProductRelation instanceof Error) {
    return res.status(StatusCodes.NOT_FOUND).json(rawMaterialProductRelation);
  }

  return res.status(StatusCodes.OK).json(rawMaterialProductRelation);
};
