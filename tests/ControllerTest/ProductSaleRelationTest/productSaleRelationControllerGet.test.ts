import { Request, Response } from 'express';
import { productSaleRelationProvider } from '../../../src/server/database/providers/ProductSaleRelationProvider';
import { productSaleRelationController } from '../../../src/server/controllers/ProductSaleRelationController';

jest.mock(
  '../../../src/server/database/providers/ProductSaleRelationProvider',
  () => ({
    productSaleRelationProvider: {
      get: jest.fn(),
    },
  })
);

beforeEach(() => {
  jest.clearAllMocks();
});

interface IQuery {
  id: string;
}

const dataReturn = {
  id: '40819b1b-7c02-423c-8322-b1b027c71988',
  saleId: '5d98de38-93cb-4542-9dd7-5a4e03d89758',
  productId: '32c4c531-1b77-49fb-9b46-c6f101064bb7',
  quantity: 256,
  createdAt: '2024-12-18T13:31:12.747Z',
  updatedAt: '2024-12-18T13:31:12.747Z',
};

describe('Get ProductSaleRelation Test', () => {
  test('Test 1 -> successful', async () => {
    (productSaleRelationProvider.get as jest.Mock).mockReturnValue(dataReturn);

    const req = {
      query: {
        id: '40819b1b-7c02-423c-8322-b1b027c71988',
      },
    } as unknown as Request<{}, {}, {}, IQuery>;

    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    } as unknown as Response;

    await productSaleRelationController.get(req, res);

    expect(productSaleRelationProvider.get).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      productSaleRelationListed: dataReturn,
    });
  });

  test('Test 2 -> failed', async () => {
    (productSaleRelationProvider.get as jest.Mock).mockReturnValue(
      Error('Error getting product sale relation')
    );

    const req = {
      query: {
        id: '40819b1b-7c02-423c-8322-b1b027c71988',
      },
    } as unknown as Request<{}, {}, {}, IQuery>;

    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    } as unknown as Response;

    await productSaleRelationController.get(req, res);

    expect(productSaleRelationProvider.get).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Error getting product sale relation',
    });
  });
});
