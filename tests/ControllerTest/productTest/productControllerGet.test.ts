import { query, Request, Response } from 'express';
import { productProvider } from '../../../src/server/database/providers/ProductProvier';
import { productController } from '../../../src/server/controllers/ProductController';
import { ProductModel } from '../../../src/server/database/models/ProductModel';

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

describe('Create Product Test', () => {
  test('Test 01 -> successful', async () => {
    const data = {
      id: '321asd1f23a3df21',
      nome: 'Teste',
      descricao: 'Teste',
      valor: 10,
    };
    (productProvider.get as jest.Mock).mockReturnValue(data);

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
    expect(res.json).toHaveBeenCalledWith(data);
  });

  test('Test 02 -> failed', async () => {
    const data = {
      id: '321asd1f23a3df21',
      nome: 'Teste',
      descricao: 'Teste',
      valor: 10,
    };
    (productProvider.get as jest.Mock).mockReturnValue(
      Error('Erro ao consultar a base de dados de produtos')
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
    expect(res.json).toHaveBeenCalledWith(
      Error('Erro ao consultar a base de dados de produtos')
    );
  });
});
