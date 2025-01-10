// Necessary import
import { Request, Response } from 'express';
import { rawMaterialProductRelationProvider } from '../../database/providers/RawMaterialProductRelationProvider';
import { StatusCodes } from 'http-status-codes';
import { IRawMaterialProductRelations } from '../../database/models/RawMaterialProductRelationsInterface';

// Defining a query interface
interface Query {
  id: string;
}

// Exporting the function responsible for the GET method
export const get = async (
  req: Request<{}, {}, {}, Query>,
  res: Response
): Promise<any> => {
  // Destructuring the id in the query
  const { id } = req.query;

  // Calling the provider that will return the list of relations or error
  const rawMaterialProductRelation: IRawMaterialProductRelations | Error =
    await rawMaterialProductRelationProvider.get(id);

  // Validating if it's an error and returning the message
  if (rawMaterialProductRelation instanceof Error) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: rawMaterialProductRelation.message });
  }

  // Returning the list of relations
  return res
    .status(StatusCodes.OK)
    .json({ rawMaterialProductRelationListed: rawMaterialProductRelation });
};
