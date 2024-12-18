import { Request, Response } from 'express';
import { rawMaterialProductRelationProvider } from '../../database/providers/RawMaterialProductRelationProvider';
import { IRawMaterialProductRelations, IRawMaterialProductRelationsWithoutId } from '../../database/models/RawMaterialProductRelationsInterface';
import { StatusCodes } from 'http-status-codes';

type IParams = {
  id: string;
};

export const update = async (
  req: Request<IParams, {}, IRawMaterialProductRelationsWithoutId>,
  res: Response
): Promise<any> => {
  const id: string = req.params.id;
  const data: IRawMaterialProductRelationsWithoutId = req.body;

  const updateRawMaterialProductRelation: IRawMaterialProductRelations | Error =
    await rawMaterialProductRelationProvider.update(id, data);

  if (updateRawMaterialProductRelation instanceof Error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json(updateRawMaterialProductRelation);
  }
  return res.status(StatusCodes.OK).json(updateRawMaterialProductRelation);
};
