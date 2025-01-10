// Necessary imports
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { rawMaterialProvider } from '../../database/providers/RawMaterialProvider';
import { IRawMaterials } from '../../database/models/RawMaterialsInterface';

// Definition of the query interface
interface IQuery {
  id?: string;
  nome?: string | object;
}

// Exporting the function responsible for the GET method
export const get = async (
  req: Request<{}, {}, {}, IQuery>,
  res: Response
): Promise<any> => {
  // Destructuring the query from the request
  const { query } = req;

  // Calling the provider that fetches the raw material and returns a list or error
  const getRawMaterial: IRawMaterials | Error = await rawMaterialProvider.get(
    query
  );

  // Validating if it's an error and returning the message
  if (getRawMaterial instanceof Error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: getRawMaterial.message });
  }

  // Returning the list of raw materials
  return res.status(StatusCodes.OK).json({ rawMaterialListed: getRawMaterial });
};
