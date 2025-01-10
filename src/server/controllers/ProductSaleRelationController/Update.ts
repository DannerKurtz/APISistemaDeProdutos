// Necessary imports
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import {
  IProductSaleRelations,
  IProductSaleRelationsWithoutId,
} from '../../database/models/ProductSaleRelationsInterface';
import { productSaleRelationProvider } from '../../database/providers/ProductSaleRelationProvider';

// Declaration of the params interface
type IParams = {
  id: string;
};

// Exporting the function responsible for the PUT method
export const update = async (
  req: Request<IParams, {}, IProductSaleRelationsWithoutId>,
  res: Response
): Promise<any> => {
  // Destructuring the body in the request and the id in the params
  const { body } = req;
  const { id } = req.params;

  // Calling the provider that updates the relation, returning the updated value or an error
  const updatedProductSaleRelation: IProductSaleRelations | Error =
    await productSaleRelationProvider.update(id, body);

  // Validating if updatedProductSaleRelation is an error and returning it
  if (updatedProductSaleRelation instanceof Error)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: updatedProductSaleRelation.message });
  // Returning the updated relation
  return res
    .status(StatusCodes.OK)
    .json({ productSaleRelationUpdated: updatedProductSaleRelation });
};
