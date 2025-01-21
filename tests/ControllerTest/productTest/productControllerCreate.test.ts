import { Request, Response } from 'express';
import { productProvider } from '../../../src/server/database/providers/ProductProvier';
import { productController } from '../../../src/server/controllers/ProductController';
import { IProductsWithoutId } from '../../../src/server/database/models/ProductsInterface';

jest.mock('../../../src/server/database/providers/ProductProvier', () => ({
  productProvider: {
    create: jest.fn(),
  },
}));

beforeEach(() => {
  jest.clearAllMocks();
});

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
    (productProvider.create as jest.Mock).mockReturnValue(dataExemple);

    const req = {
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
    } as unknown as Request<{}, {}, IProductsWithoutId>;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await productController.create(req, res);

    expect(productProvider.create).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ productCreated: dataExemple });
  });

  test('Test 02 -> failed', async () => {
    const data = {
      id: '321asd1f23a3df21',
      nome: 'Teste',
      descricao: 'Teste',
      valor: 10,
    };
    (productProvider.create as jest.Mock).mockReturnValue(
      Error('Error creating product')
    );

    const req = {
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
    } as unknown as Request<{}, {}, IProductsWithoutId>;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await productController.create(req, res);

    expect(productProvider.create).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Error creating product' });
  });
});
