// Necessary imports
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { productSaleRelationProvider } from '../../database/providers/ProductSaleRelationProvider';
import { IProductSaleRelations } from '../../database/models/ProductSaleRelationsInterface';

// Definition of a query interface
interface IQuery {
  id: string;
}

// Export of the function responsible for the GET method
export const get = async (
  req: Request<{}, {}, {}, IQuery>,
  res: Response
): Promise<any> => {
  // Destructuring the id from the query
  const { id } = req.query;

  // Calling the provider to fetch the relations
  const getProductSaleRelation: IProductSaleRelations | Error =
    await productSaleRelationProvider.get(id);

  // Validation if it returns an error, it will send it
  if (getProductSaleRelation instanceof Error)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: getProductSaleRelation.message });

  // Returns the fetched relations
  return res
    .status(StatusCodes.OK)
    .json({ productSaleRelationListed: getProductSaleRelation });
};
