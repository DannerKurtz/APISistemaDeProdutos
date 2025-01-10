// Necessary imports
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { productSaleRelationProvider } from '../../database/providers/ProductSaleRelationProvider';

// Declaration of the interface for the params
interface IParams {
  id: string;
}

// Export of the function responsible for the DELETE method
export const deleteProductSaleRelation = async (
  req: Request<IParams>,
  res: Response
): Promise<any> => {
  // Destructuring the id from the params
  const { id } = req.params;

  // Calling the provider that deletes a relation, returning a boolean or Error
  const productSaleRelationDeleted: Boolean | Error =
    await productSaleRelationProvider.deleteProductSaleRelation(id);

  // Validation of productSaleRelationDeleted if it's an error, it will return the error
  if (productSaleRelationDeleted instanceof Error)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: productSaleRelationDeleted.message });

  // Returns if the relation was deleted
  return res
    .status(StatusCodes.OK)
    .json({ productSaleRelationDeleted: productSaleRelationDeleted });
};
