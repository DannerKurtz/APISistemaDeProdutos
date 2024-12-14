import { Request, Response } from 'express';
import { ProductSaleRelationModel } from '../../database/models/ProductSaleRelationModel';
import { productSaleRelationProvider } from '../../database/providers/ProductSaleRelationProvider';
import { StatusCodes } from 'http-status-codes';

type RelationWithoutId = Omit<ProductSaleRelationModel, 'id'>;

export const create = async (
  req: Request<{}, {}, RelationWithoutId>,
  res: Response
): Promise<any> => {
  const body = req.body;

  const newProductSaleRelation = await productSaleRelationProvider.create(body);

  if (newProductSaleRelation instanceof Error)
    return res.status(StatusCodes.BAD_REQUEST).json(newProductSaleRelation);

  return res.status(StatusCodes.CREATED).json(newProductSaleRelation);
};
