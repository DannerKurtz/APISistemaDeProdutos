import { Request, Response } from 'express';
import {
  IProductSaleRelations,
  IProductSaleRelationsWithoutId,
} from '../../database/models/ProductSaleRelationsInterface';
import { productSaleRelationProvider } from '../../database/providers/ProductSaleRelationProvider';
import { StatusCodes } from 'http-status-codes';

export const create = async (
  req: Request<{}, {}, IProductSaleRelationsWithoutId>,
  res: Response
): Promise<any> => {
  const body: IProductSaleRelationsWithoutId = req.body;

  const newProductSaleRelation: IProductSaleRelations | Error =
    await productSaleRelationProvider.create(body);

  if (newProductSaleRelation instanceof Error)
    return res.status(StatusCodes.BAD_REQUEST).json(newProductSaleRelation);

  return res.status(StatusCodes.CREATED).json(newProductSaleRelation);
};
