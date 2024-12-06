import { Request, Response } from 'express';
import { rawMaterialProductRelationProvider } from '../../database/providers/RawMaterialProductRelation';
import { StatusCodes } from 'http-status-codes';

type Query = {
  id: string;
};

export const get = async (
  req: Request<{}, {}, {}, Query>,
  res: Response
): Promise<any> => {
  const { id } = req.query;

  const rawMaterialProductRelation =
    await rawMaterialProductRelationProvider.get(id);

  if (rawMaterialProductRelation instanceof Error) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ rawMaterialProductRelation });
  }

  return res.status(StatusCodes.OK).json({ rawMaterialProductRelation });
};
