// Necessary import''
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { rawMaterialProductRelationProvider } from '../../database/providers/RawMaterialProductRelationProvider';

// Defining the params interface
interface IParams {
  id: string;
}

// Exporting the function responsible for the DELETE method
export const deleteRawMaterialProductRelation = async (
  req: Request<IParams>,
  res: Response
): Promise<any> => {
  // Destructuring the id parameter
  const { id } = req.params;

  // Calling the delete provider, returning boolean or error
  const deleteRawMaterialProductRelation: Boolean | Error =
    await rawMaterialProductRelationProvider.deleteRawMaterialProductRelation(
      id
    );

  // Validating if it's an error and returning the message
  if (deleteRawMaterialProductRelation instanceof Error)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: deleteRawMaterialProductRelation.message });

  // Returning if it was deleted
  return res.status(StatusCodes.OK).json({
    rawMaterialProductRelationDeleted: deleteRawMaterialProductRelation,
  });
};
