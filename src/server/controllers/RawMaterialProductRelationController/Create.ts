import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import {
  IRawMaterialProductRelations,
  IRawMaterialProductRelationsWithoutId,
} from '../../database/models/RawMaterialProductRelationsInterface';
import { rawMaterialProductRelationProvider } from '../../database/providers/RawMaterialProductRelationProvider';

export const create = async (
  req: Request<{}, {}, IRawMaterialProductRelationsWithoutId>,
  res: Response
): Promise<any> => {
  const data: IRawMaterialProductRelationsWithoutId = req.body;
  const newRelation: IRawMaterialProductRelations | Error =
    await rawMaterialProductRelationProvider.create(data);

  if (newRelation instanceof Error) {
    return res
      .status(StatusCodes.CONFLICT)
      .json({ error: newRelation.message });
  }

  return res
    .status(StatusCodes.CREATED)
    .json({ rawMaterialProductRelationCreated: newRelation });
};
