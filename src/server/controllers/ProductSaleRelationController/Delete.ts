import { Request, Response } from 'express';
import { productSaleRelationProvider } from '../../database/providers/ProductSaleRelationProvider';
import { StatusCodes } from 'http-status-codes';

type IParams = {
  id: string;
};

export const deleteProductSaleRelation = async (
  req: Request<IParams>,
  res: Response
): Promise<any> => {
  const id: string = req.params.id;

  const productSaleRelationDeleted: Boolean | Error =
    await productSaleRelationProvider.deleteProductSaleRelation(id);

  if (productSaleRelationDeleted instanceof Error)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: productSaleRelationDeleted.message });

  return res
    .status(StatusCodes.OK)
    .json({ productSaleRelationDeleted: productSaleRelationDeleted });
};
