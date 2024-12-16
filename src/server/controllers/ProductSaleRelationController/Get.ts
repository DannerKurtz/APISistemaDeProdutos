import { Request, Response } from 'express';
import { productSaleRelationProvider } from '../../database/providers/ProductSaleRelationProvider';
import { StatusCodes } from 'http-status-codes';

type IQuery = {
  id: string;
};

export const get = async (
  req: Request<{}, {}, {}, IQuery>,
  res: Response
): Promise<any> => {
  const id = req.query.id;

  const getProductSaleRelation = await productSaleRelationProvider.get(id);

  if (getProductSaleRelation instanceof Error)
    return res.status(StatusCodes.BAD_REQUEST).json(getProductSaleRelation);

  return res.status(StatusCodes.OK).json(getProductSaleRelation);
};
