// Necessary import
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import {
  IRawMaterialProductRelations,
  IRawMaterialProductRelationsWithoutId,
} from '../../database/models/RawMaterialProductRelationsInterface';
import { rawMaterialProductRelationProvider } from '../../database/providers/RawMaterialProductRelationProvider';

// Exporting the function responsible for the POST method
export const create = async (
  req: Request<{}, {}, IRawMaterialProductRelationsWithoutId>,
  res: Response
): Promise<any> => {
  // Destructuring the body from the request
  const { body } = req;

  // Calling the provider that creates or returns an error
  const newRelation: IRawMaterialProductRelations | Error =
    await rawMaterialProductRelationProvider.create(body);

  // Validating if it's an error and returning the message
  if (newRelation instanceof Error) {
    return res
      .status(StatusCodes.CONFLICT)
      .json({ error: newRelation.message });
  }

  // Returning the created relationship
  return res
    .status(StatusCodes.CREATED)
    .json({ rawMaterialProductRelationCreated: newRelation });
};
