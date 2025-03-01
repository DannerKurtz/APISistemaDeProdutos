import { Request, Response } from 'express';
import { rawMaterialProductRelationProvider } from '../../../src/server/database/providers/RawMaterialProductRelationProvider';
import { rawMaterialProductRelationController } from '../../../src/server/controllers/RawMaterialProductRelationController';

jest.mock(
  '../../../src/server/database/providers/RawMaterialProductRelationProvider',
  () => ({
    rawMaterialProductRelationProvider: {
      deleteRawMaterialProductRelation: jest.fn(),
    },
  })
);

beforeEach(() => {
  jest.clearAllMocks();
});

type IParams = {
  id: string;
};

describe('Delete RawMaterialProductRelation Test', () => {
  test('Test 01 - successful', async () => {
    (
      rawMaterialProductRelationProvider.deleteRawMaterialProductRelation as jest.Mock
    ).mockReturnValue(true);

    const req = {
      params: { id: '123' },
    } as unknown as Request<IParams>;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await rawMaterialProductRelationController.deleteRawMaterialProductRelation(
      req,
      res
    );

    expect(
      rawMaterialProductRelationProvider.deleteRawMaterialProductRelation
    ).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      rawMaterialProductRelationDeleted: true,
    });
  });

  test('Test 02 -> failed', async () => {
    (
      rawMaterialProductRelationProvider.deleteRawMaterialProductRelation as jest.Mock
    ).mockReturnValue(
      Error('Error accessing crudService to delete rawMaterialProductRelation')
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

    await rawMaterialProductRelationController.deleteRawMaterialProductRelation(
      req,
      res
    );

    expect(
      rawMaterialProductRelationProvider.deleteRawMaterialProductRelation
    ).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Error accessing crudService to delete rawMaterialProductRelation',
    });
  });
});
