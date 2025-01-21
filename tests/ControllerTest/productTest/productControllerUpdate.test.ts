import { Request, Response } from 'express';
import { productProvider } from '../../../src/server/database/providers/ProductProvier';
import { productController } from '../../../src/server/controllers/ProductController';
import { IProductsWithoutId } from '../../../src/server/database/models/ProductsInterface';

jest.mock('../../../src/server/database/providers/ProductProvier', () => ({
  productProvider: {
    update: jest.fn(),
  },
}));

beforeEach(() => {
  jest.clearAllMocks();
});

type IParams = {
  id: string;
};

const dataExemple = {
  id: '654321',
  name: 'Exemple',
  percentage: 70,
  price: 170,
  quantity: 1,
  weight: 10,
  rawMaterialProductRelation: [
    {
      id: '123456',
      productId: '654321',
      rawMaterialId: '456123',
      rawMaterialQuantity: 130,
    },
  ],
};

describe('Create Product Test', () => {
  test('Test 01 -> successful', async () => {
    (productProvider.update as jest.Mock).mockReturnValue(dataExemple);

    const req = {
      params: {
        id: '654321',
      },
      body: {
        name: 'Exemple',
        percentage: 70,
        quantity: 1,
        rawMaterialProductRelation: [
          {
            rawMaterialId: '456123',
            rawMaterialQuantity: 130,
          },
        ],
      },
    } as unknown as Request<IParams, {}, IProductsWithoutId>;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await productController.update(req, res);

    expect(productProvider.update).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ productUpdated: dataExemple });
  });

  test('Test 02 -> failed', async () => {
    (productProvider.update as jest.Mock).mockReturnValue(
      Error('Error updating product')
    );

    const req = {
      params: {
        id: 'Te321asd1f23a3df21ste',
      },
      body: {
        nome: 'Teste',
        descricao: 'Teste',
        valor: 10,
      },
    } as unknown as Request<IParams, {}, IProductsWithoutId>;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await productController.update(req, res);

    expect(productProvider.update).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Error updating product' });
  });
});
