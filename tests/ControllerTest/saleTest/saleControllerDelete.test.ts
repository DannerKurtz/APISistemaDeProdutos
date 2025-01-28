import { Request, Response } from 'express';
import { saleController } from '../../../src/server/controllers/SaleController';
import { saleProvider } from '../../../src/server/database/providers/SaleProvider';

jest.mock('../../../src/server/database/providers/SaleProvider', () => ({
  saleProvider: {
    deleteSale: jest.fn(),
  },
}));

interface IParams {
  id: string;
}

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Delete Sale Test', () => {
  test('Test 1 -> successful', async () => {
    (saleProvider.deleteSale as jest.Mock).mockReturnValue(true);

    const req = {
      params: {
        id: '123',
      },
    } as unknown as Request<IParams>;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await saleController.deleteSale(req, res);

    expect(saleProvider.deleteSale).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ saleDeleted: true });
  });

  test('Test 2 -> failed', async () => {
    (saleProvider.deleteSale as jest.Mock).mockReturnValue(
      Error('Error deleting sale')
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

    await saleController.deleteSale(req, res);

    expect(saleProvider.deleteSale).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Error deleting sale' });
  });
});
