import { Request, Response } from 'express';
import { productProvider } from '../../../src/server/database/providers/ProductProvier';
import { productController } from '../../../src/server/controllers/ProductController';

jest.mock('../../../src/server/database/providers/ProductProvier', () => ({
  productProvider: {
    get: jest.fn(),
  },
}));

beforeEach(() => {
  jest.clearAllMocks();
});

type IQuery = {
  nome?: string;
  id?: string;
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
    (productProvider.get as jest.Mock).mockReturnValue(dataExemple);

    const req = {
      query: {
        nome: 'Teste',
      },
    } as unknown as Request<{}, {}, {}, IQuery>;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await productController.get(req, res);

    expect(productProvider.get).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ productListed: dataExemple });
  });

  test('Test 02 -> failed', async () => {
    (productProvider.get as jest.Mock).mockReturnValue(
      Error('Error getting products')
    );

    const req = {
      query: {
        nome: 'Teste',
      },
    } as unknown as Request<{}, {}, {}, IQuery>;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await productController.get(req, res);

    expect(productProvider.get).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Error getting products' });
  });
});
