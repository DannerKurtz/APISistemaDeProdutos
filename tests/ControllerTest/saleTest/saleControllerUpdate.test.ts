import { Request, Response } from 'express';
import { saleController } from '../../../src/server/controllers/SaleController';
import { saleProvider } from '../../../src/server/database/providers/SaleProvider';
import { ISalesWithoutId } from '../../../src/server/database/models/SalesInterface';

jest.mock('../../../src/server/database/providers/SaleProvider', () => ({
  saleProvider: {
    update: jest.fn(),
  },
}));

interface IParams {
  id: string;
}

const dataUpdateExemple = {
  saleNumber: 'Esse é um novo nome 2',
  userId: '1d521e31-7959-41df-9b2a-9c2bb6c36f2a',
  customerId: '696720c4-6eed-4285-8fe8-937edf140989',
  productSaleRelations: [
    {
      productId: '517c5cc4-6a4e-40e0-8f88-9bb7d5747ede',
      quantity: 2,
    },
  ],
};

const dataResult = {
  id: '8e0a4533-1b2b-4fc9-8ab1-f9d17610f25e',
  saleNumber: 'Esse é um novo nome 2',
  discount: 0,
  totalPrice: 78165.94,
  userId: '1d521e31-7959-41df-9b2a-9c2bb6c36f2a',
  customerId: '696720c4-6eed-4285-8fe8-937edf140989',
  createdAt: '2025-01-20T13:56:05.861Z',
  updatedAt: '2025-01-20T13:57:52.924Z',
  productSaleRelations: [
    {
      id: '68d0cc77-f44a-49be-8e33-398cd4323800',
      saleId: '8e0a4533-1b2b-4fc9-8ab1-f9d17610f25e',
      productId: '517c5cc4-6a4e-40e0-8f88-9bb7d5747ede',
      quantity: 2,
      createdAt: '2025-01-20T13:57:52.905Z',
      updatedAt: '2025-01-20T13:57:52.905Z',
    },
  ],
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Update Sale Test', () => {
  test('Test 1 -> successful', async () => {
    (saleProvider.update as jest.Mock).mockReturnValue(dataResult);

    const req = {
      params: {
        id: '123',
      },
      body: dataUpdateExemple,
    } as unknown as Request<IParams, {}, ISalesWithoutId>;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await saleController.update(req, res);

    expect(saleProvider.update).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ saleUpdated: dataResult });
  });

  test('Test 2 -> failed', async () => {
    (saleProvider.update as jest.Mock).mockReturnValue(
      Error('Error updating sale')
    );

    const req = {
      params: {
        id: '123',
      },
      body: dataUpdateExemple,
    } as unknown as Request<IParams, {}, ISalesWithoutId>;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await saleController.update(req, res);

    expect(saleProvider.update).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Error updating sale' });
  });
});
