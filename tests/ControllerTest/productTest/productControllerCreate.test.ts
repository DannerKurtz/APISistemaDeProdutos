import { Request, Response } from 'express';
import { productProvider } from '../../../src/server/database/providers/ProductProvier';
import { productController } from '../../../src/server/controllers/ProductController';
import { ProductModel } from '../../../src/server/database/models/ProductModel';

jest.mock('../../../src/server/database/providers/ProductProvier', () => ({
  productProvider: {
    create: jest.fn(),
  },
}));

beforeEach(() => {
  jest.clearAllMocks();
});

type productWithoutID = Omit<ProductModel, 'id'>;

describe('Create Product Test', () => {
  test('Test 01 -> successful', async () => {
    const data = {
      id: '321asd1f23a3df21',
      nome: 'Teste',
      descricao: 'Teste',
      valor: 10,
    };
    (productProvider.create as jest.Mock).mockReturnValue(data);

    const req = {
      body: {
        nome: 'Teste',
        descricao: 'Teste',
        valor: 10,
      },
    } as unknown as Request<{}, {}, productWithoutID>;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await productController.create(req, res);

    expect(productProvider.create).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(data);
  });

  test('Test 02 -> failed', async () => {
    const data = {
      id: '321asd1f23a3df21',
      nome: 'Teste',
      descricao: 'Teste',
      valor: 10,
    };
    (productProvider.create as jest.Mock).mockReturnValue(
      Error('Erro ao criar novo produto no banco de dados')
    );

    const req = {
      body: {
        nome: 'Teste',
        descricao: 'Teste',
        valor: 10,
      },
    } as unknown as Request<{}, {}, productWithoutID>;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await productController.create(req, res);

    expect(productProvider.create).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      'Erro ao criar novo produto no banco de dados'
    );
  });
});
