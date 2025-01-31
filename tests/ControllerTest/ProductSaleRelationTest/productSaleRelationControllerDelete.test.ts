import { Request, Response } from 'express';
import { productSaleRelationProvider } from '../../../src/server/database/providers/ProductSaleRelationProvider';
import { productSaleRelationController } from '../../../src/server/controllers/ProductSaleRelationController';

jest.mock(
  '../../../src/server/database/providers/ProductSaleRelationProvider',
  () => ({
    productSaleRelationProvider: {
      deleteProductSaleRelation: jest.fn(),
    },
  })
);

beforeEach(() => {
  jest.clearAllMocks();
});

interface IParams {
  id: string;
}

describe('Delete ProductSaleRelation Test', () => {
  test('Test 1 -> successful', async () => {
    (
      productSaleRelationProvider.deleteProductSaleRelation as jest.Mock
    ).mockReturnValue(true);

    const req = {
      params: {
        id: '123',
      },
    } as unknown as Request<IParams>;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await productSaleRelationController.deleteProductSaleRelation(req, res);

    expect(
      productSaleRelationProvider.deleteProductSaleRelation
    ).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ productSaleRelationDeleted: true });
  });

  test('Test 2 -> failed', async () => {
    (
      productSaleRelationProvider.deleteProductSaleRelation as jest.Mock
    ).mockReturnValue(Error('Error deleting product sale relation'));

    const req = {
      params: {
        id: '123',
      },
    } as unknown as Request<IParams>;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await productSaleRelationController.deleteProductSaleRelation(req, res);

    expect(
      productSaleRelationProvider.deleteProductSaleRelation
    ).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Error deleting product sale relation',
    });
  });
});
