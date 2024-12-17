import { Request, Response } from 'express';
import {
  IProductSaleRelations,
  IProductSaleRelationsWithoutId,
} from '../../database/models/ProductSaleRelationsInterface';
import { productSaleRelationProvider } from '../../database/providers/ProductSaleRelationProvider';
import { StatusCodes } from 'http-status-codes';

type IParams = {
  id: string;
};
export const update = async (
  req: Request<IParams, {}, IProductSaleRelationsWithoutId>,
  res: Response
): Promise<any> => {
  const body: IProductSaleRelationsWithoutId = req.body;
  const id: string = req.params.id;

  const updatedProductSaleRelation: IProductSaleRelations | Error =
    await productSaleRelationProvider.update(id, body);

  if (updatedProductSaleRelation instanceof Error)
    return res.status(StatusCodes.BAD_REQUEST).json(updatedProductSaleRelation);

  return res.status(StatusCodes.OK).json(updatedProductSaleRelation);
};
