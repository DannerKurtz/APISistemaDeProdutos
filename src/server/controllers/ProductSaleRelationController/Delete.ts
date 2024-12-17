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
  const id = req.params.id;

  const productSaleRelationDeleted =
    await productSaleRelationProvider.deleteProductSaleRelation(id);

  if (productSaleRelationDeleted instanceof Error)
    return res.status(StatusCodes.BAD_REQUEST).json(productSaleRelationDeleted);

  return res.status(StatusCodes.OK).json(productSaleRelationDeleted);
};