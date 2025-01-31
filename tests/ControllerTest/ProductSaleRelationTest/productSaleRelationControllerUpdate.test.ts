import { Request, Response } from 'express';
import { productSaleRelationProvider } from '../../../src/server/database/providers/ProductSaleRelationProvider';
import { productSaleRelationController } from '../../../src/server/controllers/ProductSaleRelationController';
import { IProductSaleRelationsWithoutId } from '../../../src/server/database/models/ProductSaleRelationsInterface';

jest.mock(
  '../../../src/server/database/providers/ProductSaleRelationProvider',
  () => ({
    productSaleRelationProvider: {
      update: jest.fn(),
    },
  })
);

beforeEach(() => {
  jest.clearAllMocks();
});

interface IParams {
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

const dataExemple = {
  saleId: '5d98de38-93cb-4542-9dd7-5a4e03d89758',
  productId: '32c4c531-1b77-49fb-9b46-c6f101064bb7',
  quantity: 256,
};

describe('Update ProductSaleRelation Test', () => {
  test('Test 1 -> successful', async () => {
    (productSaleRelationProvider.update as jest.Mock).mockReturnValue(
      dataReturn
    );

    const req = {
      params: {
        id: '123',
      },
      body: dataExemple,
    } as unknown as Request<IParams, {}, IProductSaleRelationsWithoutId>;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await productSaleRelationController.update(req, res);

    expect(productSaleRelationProvider.update).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      productSaleRelationUpdated: dataReturn,
    });
  });

  test('Test 2 -> failed', async () => {
    (productSaleRelationProvider.update as jest.Mock).mockReturnValue(
      Error('Error updating product sale relation')
    );

    const req = {
      params: {
        id: '123',
      },
      body: dataExemple,
    } as unknown as Request<IParams, {}, IProductSaleRelationsWithoutId>;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await productSaleRelationController.update(req, res);

    expect(productSaleRelationProvider.update).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Error updating product sale relation',
    });
  });
});
