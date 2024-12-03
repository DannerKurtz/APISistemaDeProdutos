import { Request, Response } from 'express';
import { ProductModel } from '../../database/models/ProductModel';
import { productProvider } from '../../database/providers/ProductProvier';
import { RawMaterialAndProductsRelationModel } from '../../database/models/RawMaterialAndProductsRelationModel';
import { StatusCodes } from 'http-status-codes';

type BodyWithoutId = Omit<ProductModel, 'id'> & {
  materiaPrima: [{ id: string; quantidade: number }];
  senha: undefined;
  novaSenha: undefined;
};
export const update = async (
  req: Request<{ id: string }, {}, BodyWithoutId>,
  res: Response
): Promise<any> => {
  const id = req.params.id;
  const body: BodyWithoutId = req.body;

  const updateProduct = await productProvider.update(id, body);

  res.status(StatusCodes.OK).json(updateProduct);
};
