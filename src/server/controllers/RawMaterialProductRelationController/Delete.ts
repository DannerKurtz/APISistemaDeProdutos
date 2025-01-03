import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { rawMaterialProductRelationProvider } from '../../database/providers/RawMaterialProductRelationProvider';

type IParams = {
  id: string;
};

export const deleteRawMaterialProductRelation = async (
  req: Request<IParams>,
  res: Response
): Promise<any> => {
  const id = req.params.id;

  const deleteRawMaterialProductRelation: Boolean | Error =
    await rawMaterialProductRelationProvider.deleteRawMaterialProductRelation(
      id
    );

  if (deleteRawMaterialProductRelation instanceof Error)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: deleteRawMaterialProductRelation.message });

  return res
    .status(StatusCodes.OK)
    .json({ rawMaterialProductRelationDeleted: deleteRawMaterialProductRelation });
};
