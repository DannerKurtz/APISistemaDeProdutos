// Necessary imports
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import {
  IRawMaterials,
  IRawMaterialsWithoutId,
} from '../../database/models/RawMaterialsInterface';
import { rawMaterialProvider } from '../../database/providers/RawMaterialProvider';

// Exporting the function responsible for the POST method
export const create = async (
  req: Request<{}, {}, IRawMaterialsWithoutId>,
  res: Response
): Promise<any> => {
  // Destructuring the body in the request
  const { body } = req;

  // Calling the provider responsible for creating the raw material or returning an error
  const createNewData: IRawMaterials | Error = await rawMaterialProvider.create(
    body
  );

  // Validating the error and returning the message
  if (createNewData instanceof Error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: createNewData.message });
  }

  // Returning the created raw material
  return res
    .status(StatusCodes.CREATED)
    .json({ rawMaterialCreated: createNewData });
};
