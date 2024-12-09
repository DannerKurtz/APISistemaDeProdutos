import { Request, Response } from 'express';
import { productProvider } from '../../../src/server/database/providers/ProductProvier';
import { productController } from '../../../src/server/controllers/ProductController';
import { ProductModel } from '../../../src/server/database/models/ProductModel';

jest.mock('../../../src/server/database/providers/ProductProvier', () => ({
  productProvider: {
    update: jest.fn(),
  },
}));

beforeEach(() => {
  jest.clearAllMocks();
});

type productWithoutID = Omit<ProductModel, 'id'>;

type IParams = {
  id: string;
};

describe('Create Product Test', () => {
  test('Test 01 -> successful', async () => {
    const data = {
      id: '321asd1f23a3df21',
      nome: 'Teste',
      descricao: 'Teste',
      valor: 10,
    };
    (productProvider.update as jest.Mock).mockReturnValue(data);

    const req = {
      params: {
        id: 'Te321asd1f23a3df21ste',
      },
      body: {
        nome: 'Teste',
        descricao: 'Teste',
        valor: 10,
      },
    } as unknown as Request<IParams, {}, productWithoutID>;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await productController.update(req, res);

    expect(productProvider.update).toHaveBeenCalledTimes(1);
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
    (productProvider.update as jest.Mock).mockReturnValue(
      Error('Error ao tentar fazer as alterações na base de dados do Produto')
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
    } as unknown as Request<IParams, {}, productWithoutID>;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await productController.update(req, res);

    expect(productProvider.update).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      Error('Error ao tentar fazer as alterações na base de dados do Produto')
    );
  });
});
