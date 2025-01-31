import { productSaleRelationProvider } from '../../../src/server/database/providers/ProductSaleRelationProvider';
import { Request, Response } from 'express';
import { IProductSaleRelationsWithoutId } from '../../../src/server/database/models/ProductSaleRelationsInterface';
import { productSaleRelationController } from '../../../src/server/controllers/ProductSaleRelationController';

jest.mock(
  '../../../src/server/database/providers/ProductSaleRelationProvider',
  () => ({
    productSaleRelationProvider: {
      create: jest.fn(),
    },
  })
);

beforeEach(() => {
  jest.clearAllMocks();
});

const dataReturn = {
  id: '40819b1b-7c02-423c-8322-b1b027c71988',
  saleId: '5d98de38-93cb-4542-9dd7-5a4e03d89758',
  productId: '32c4c531-1b77-49fb-9b46-c6f101064bb7',
  quantity: 256,
  createdAt: '2024-12-18T13:31:12.747Z',
  updatedAt: '2024-12-18T13:31:12.747Z',
};

const dataExemple = {
  saleId: '5d98de38-93cb-4542-9dd7-5a4e03d89758',
  productId: '32c4c531-1b77-49fb-9b46-c6f101064bb7',
  quantity: 256,
};

describe('Create ProductSaleRelation Test', () => {
  test('Test 1 -> successful', async () => {
    (productSaleRelationProvider.create as jest.Mock).mockReturnValue(
      dataReturn
    );

    const req = {
      body: dataExemple,
    } as unknown as Request<{}, {}, IProductSaleRelationsWithoutId>;

    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    } as unknown as Response;

    await productSaleRelationController.create(req, res);

    expect(productSaleRelationProvider.create).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      productSaleRelationCreated: dataReturn,
    });
  });

  test('Test 2 -> failed', async () => {
    (productSaleRelationProvider.create as jest.Mock).mockReturnValue(
      Error('Error creating product sale relation')
    );

    const req = {
      body: dataExemple,
    } as unknown as Request<{}, {}, IProductSaleRelationsWithoutId>;

    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    } as unknown as Response;

    await productSaleRelationController.create(req, res);

    expect(productSaleRelationProvider.create).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Error creating product sale relation',
    });
  });
});
