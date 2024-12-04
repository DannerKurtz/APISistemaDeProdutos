import { Request, Response } from 'express';
import { ProductModel } from '../../database/models/ProductModel';
import { productProvider } from '../../database/providers/ProductProvier';
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

  if (updateProduct instanceof Error)
    return res.status(StatusCodes.BAD_REQUEST).json(updateProduct);

  return res.status(StatusCodes.OK).json(updateProduct);
};
