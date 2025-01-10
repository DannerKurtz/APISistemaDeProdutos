// Necessary imports
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import {
  IRawMaterials,
  IRawMaterialsWithoutId,
} from '../../database/models/RawMaterialsInterface';
import { rawMaterialProvider } from '../../database/providers/RawMaterialProvider';

// Definition of the params interface
interface IParams {
  id: string;
}

// Exporting the function responsible for the PUT method
export const update = async (
  req: Request<IParams, {}, IRawMaterialsWithoutId>,
  res: Response
): Promise<any> => {
  // Destructuring the id from the parameters and the body from the request
  const { id } = req.params;
  const { body } = req;

  // Calling the provider to update the raw material, returning the updated value or an error
  const updateRawMaterial: IRawMaterials | Error =
    await rawMaterialProvider.update(id, body);

  // Validating if it's an error and returning the message
  if (updateRawMaterial instanceof Error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: updateRawMaterial.message });
  }

  // Returning the updated raw material
  return res
    .status(StatusCodes.OK)
    .json({ rawMaterialUpdated: updateRawMaterial });
};
