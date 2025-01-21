import { Request, Response } from 'express';
import { productProvider } from '../../../src/server/database/providers/ProductProvier';
import { productController } from '../../../src/server/controllers/ProductController';

jest.mock('../../../src/server/database/providers/ProductProvier', () => ({
  productProvider: {
    deleteProduct: jest.fn(),
  },
}));

beforeEach(() => {
  jest.clearAllMocks();
});

type IParams = {
  id: string;
};

describe('Delete Product Test', () => {
  test('Test 01 - successful', async () => {
    (productProvider.deleteProduct as jest.Mock).mockReturnValue(true);

    const req = {
      params: {
        id: '123',
      },
    } as unknown as Request<IParams>;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await productController.deleteProduct(req, res);

    expect(productProvider.deleteProduct).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ productDeleted: true });
  });

  test('Test 02 - failed', async () => {
    (productProvider.deleteProduct as jest.Mock).mockReturnValue(
      Error('Error deleting product')
    );

    const req = {
      params: {
        id: '123',
      },
    } as unknown as Request<IParams>;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await productController.deleteProduct(req, res);

    expect(productProvider.deleteProduct).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Error deleting product' });
  });
});
