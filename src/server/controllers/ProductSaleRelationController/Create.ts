// Necessary imports
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import {
  IProductSaleRelations,
  IProductSaleRelationsWithoutId,
} from '../../database/models/ProductSaleRelationsInterface';
import { productSaleRelationProvider } from '../../database/providers/ProductSaleRelationProvider';

// Export of the function responsible for the POST method
export const create = async (
  req: Request<{}, {}, IProductSaleRelationsWithoutId>,
  res: Response
): Promise<any> => {
  // Destructuring the body of the request
  const { body } = req;

  // Calling to create a new product-sale relation or error
  const newProductSaleRelation: IProductSaleRelations | Error =
    await productSaleRelationProvider.create(body);

  // Validation of newProductSaleRelation if it's an instance of error and returning an error
  if (newProductSaleRelation instanceof Error)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: newProductSaleRelation.message });

  // Returns the created relation
  return res
    .status(StatusCodes.CREATED)
    .json({ productSaleRelationCreated: newProductSaleRelation });
};
