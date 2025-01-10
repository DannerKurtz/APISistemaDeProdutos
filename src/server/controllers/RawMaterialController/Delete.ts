// Necessary import
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { rawMaterialProvider } from '../../database/providers/RawMaterialProvider';

// Definition of the params interface
interface IParams {
  id: string;
}

// Exporting the function responsible for the DELETE method
export const deleteRawMaterial = async (
  req: Request<IParams>,
  res: Response
): Promise<any> => {
  // Destructuring the id from the params
  const { id } = req.params;

  // Calling the provider to delete the raw material, returning a boolean or error
  const deleteRawMaterialResult: Boolean | Error =
    await rawMaterialProvider.deleteRawMaterial(id);

  // Validating if it’s an error and returning the message
  if (deleteRawMaterialResult instanceof Error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: deleteRawMaterialResult.message });
  }

  // Returning if the raw material was deleted
  return res
    .status(StatusCodes.OK)
    .json({ rawMaterialDeleted: deleteRawMaterialResult });
};
