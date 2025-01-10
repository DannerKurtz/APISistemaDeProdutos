// Necessary import
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { rawMaterialProductRelationProvider } from '../../database/providers/RawMaterialProductRelationProvider';
import {
  IRawMaterialProductRelations,
  IRawMaterialProductRelationsWithoutId,
} from '../../database/models/RawMaterialProductRelationsInterface';

// Definition of the params interface
interface IParams {
  id: string;
}

// Exporting the function responsible for the PUT method
export const update = async (
  req: Request<IParams, {}, IRawMaterialProductRelationsWithoutId>,
  res: Response
): Promise<any> => {
  // Destructuring the id from params and the body from the request
  const { id } = req.params;
  const { body } = req;

  // Calling the provider that updates the relation or returns an error
  const updateRawMaterialProductRelation: IRawMaterialProductRelations | Error =
    await rawMaterialProductRelationProvider.update(id, body);

    // Validating if it's an error and returning the message
  if (updateRawMaterialProductRelation instanceof Error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: updateRawMaterialProductRelation.message });
  }

  // Returning the updated relation
  return res
    .status(StatusCodes.OK)
    .json({
      rawMaterialProductRelationUpdated: updateRawMaterialProductRelation,
    });
};
