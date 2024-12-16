import { Request, Response } from 'express';
import { ProductSaleRelationModel } from '../../database/models/ProductSaleRelationModel';
import { productSaleRelationProvider } from '../../database/providers/ProductSaleRelationProvider';
import { StatusCodes } from 'http-status-codes';

type RelationWithoutId = Omit<ProductSaleRelationModel, 'id'>;
type IParams = {
  id: string;
};
export const update = async (
  req: Request<IParams, {}, RelationWithoutId>,
  res: Response
): Promise<any> => {
  const body = req.body;
  const id = req.params.id;

  const updatedProductSaleRelation = await productSaleRelationProvider.update(
    id,
    body
  );

  if (updatedProductSaleRelation instanceof Error)
    return res.status(StatusCodes.BAD_REQUEST).json(updatedProductSaleRelation);

  return res.status(StatusCodes.OK).json(updatedProductSaleRelation);
};
