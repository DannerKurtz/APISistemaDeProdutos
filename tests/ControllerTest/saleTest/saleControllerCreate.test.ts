import { Request, Response } from 'express';
import { ISalesWithoutId } from '../../../src/server/database/models/SalesInterface';
import { saleProvider } from '../../../src/server/database/providers/SaleProvider';
import { saleController } from '../../../src/server/controllers/SaleController';

jest.mock('../../../src/server/database/providers/SaleProvider', () => ({
  saleProvider: {
    create: jest.fn(),
  },
}));

const dataCreateExemple = {
  saleNumber: 'nome fácil 4',
  totalPrice: 100000,
  userId: '1d521e31-7959-41df-9b2a-9c2bb6c36f2a',
  customerId: '696720c4-6eed-4285-8fe8-937edf140989',
  productSaleRelations: [
    {
      productId: '517c5cc4-6a4e-40e0-8f88-9bb7d5747ede',
      quantity: 2,
    },
    {
      productId: '517c5cc4-6a4e-40e0-8f88-9bb7d5747ede',
      quantity: 2,
    },
  ],
};

const dataResult = {
  id: '8e0a4533-1b2b-4fc9-8ab1-f9d17610f25e',
  saleNumber: 'nome fácil 4',
  discount: 36.03,
  totalPrice: 100000,
  userId: '1d521e31-7959-41df-9b2a-9c2bb6c36f2a',
  customerId: '696720c4-6eed-4285-8fe8-937edf140989',
  createdAt: '2025-01-20T13:56:05.861Z',
  updatedAt: '2025-01-20T13:56:05.861Z',
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Create Sale Test', () => {
  test('Test 1 -> successful', async () => {
    (saleProvider.create as jest.Mock).mockReturnValue(dataResult);
    const req = {
      body: dataCreateExemple,
    } as unknown as Request<{}, {}, ISalesWithoutId>;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await saleController.create(req, res);

    expect(saleProvider.create).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ saleCreated: dataResult });
  });

  test('Test 2 -> failed', async () => {
    (saleProvider.create as jest.Mock).mockReturnValue(
      Error('Error creating sale')
    );
    const req = {
      body: dataCreateExemple,
    } as unknown as Request<{}, {}, ISalesWithoutId>;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await saleController.create(req, res);

    expect(saleProvider.create).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Error creating sale' });
  });
});
