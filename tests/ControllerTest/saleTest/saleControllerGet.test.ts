import { Request, Response } from 'express';
import { saleController } from '../../../src/server/controllers/SaleController';
import { saleProvider } from '../../../src/server/database/providers/SaleProvider';

jest.mock('../../../src/server/database/providers/SaleProvider', () => ({
  saleProvider: {
    get: jest.fn(),
  },
}));

const dataResult = [
  {
    id: '123',
    id_user: '456',
    id_product: '789',
    quantity: 5,
    total_price: 50.0,
    created_at: new Date(),
    updated_at: new Date(),
  },
];

interface IQuery {
  id: string;
  saleNumber: string;
  customerName: string;
}

beforeEach(() => {
  (saleProvider.get as jest.Mock).mockReset();
});

describe('Get Sale Test', () => {
  test('Test 1 -> successful', async () => {
    (saleProvider.get as jest.Mock).mockReturnValue(dataResult);

    const req = {
      query: {
        id: '123' as string,
      },
    } as unknown as Request<{}, {}, {}, IQuery>;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await saleController.get(req, res);

    expect(saleProvider.get).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ saleListed: dataResult });
  });

  test('Test 2 -> failed', async () => {
    (saleProvider.get as jest.Mock).mockReturnValue(
      Error('Error getting sales')
    );

    const req = {
      query: {
        id: '123' as string,
      },
    } as unknown as Request<{}, {}, {}, IQuery>;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await saleController.get(req, res);

    expect(saleProvider.get).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Error getting sales' });
  });
});
