import { Request, Response } from 'express';
import { rawMaterialProductRelationProvider } from '../../../src/server/database/providers/RawMaterialProductRelationProvider';
import { rawMaterialProductRelationController } from '../../../src/server/controllers/RawMaterialProductRelationController';
import { IRawMaterialProductRelations } from '../../../src/server/database/models/RawMaterialProductRelationsInterface';

type IQuery = {
  id: string;
};

jest.mock(
  '../../../src/server/database/providers/RawMaterialProductRelationProvider',
  () => ({
    rawMaterialProductRelationProvider: {
      get: jest.fn(),
    },
  })
);

beforeEach(() => {
  jest.clearAllMocks();
});

const dataExemple: IRawMaterialProductRelations[] = [
  {
    id: '123',
    productId: '123456',
    rawMaterialId: '654321',
    rawMaterialQuantity: 10,
  },
  {
    id: '124',
    productId: '123456',
    rawMaterialId: '654321',
    rawMaterialQuantity: 10,
  },
];

describe('Get RawMaterialProductRelation Test', () => {
  test('Test 01 -> successful', async () => {
    (rawMaterialProductRelationProvider.get as jest.Mock).mockReturnValue(
      dataExemple[0]
    );

    const req = {
      query: {
        id: '123',
      },
    } as unknown as Request<{}, {}, {}, IQuery>;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await rawMaterialProductRelationController.get(req, res);

    expect(rawMaterialProductRelationProvider.get).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenLastCalledWith(200);
    expect(res.json).toHaveBeenLastCalledWith({
      rawMaterialProductRelationListed: dataExemple[0],
    });
  });

  test('Test 02 -> successful', async () => {
    (rawMaterialProductRelationProvider.get as jest.Mock).mockReturnValue(
      dataExemple
    );

    const req = {
      query: {
        id: '',
      },
    } as unknown as Request<{}, {}, {}, IQuery>;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await rawMaterialProductRelationController.get(req, res);

    expect(rawMaterialProductRelationProvider.get).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenLastCalledWith(200);
    expect(res.json).toHaveBeenLastCalledWith({
      rawMaterialProductRelationListed: dataExemple,
    });
  });

  test('Test 03 -> failed', async () => {
    (rawMaterialProductRelationProvider.get as jest.Mock).mockReturnValue(
      Error('Error accessing crudService to get rawMaterialProductRelation')
    );

    const req = {
      query: {
        id: '',
      },
    } as unknown as Request<{}, {}, {}, IQuery>;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await rawMaterialProductRelationController.get(req, res);

    expect(rawMaterialProductRelationProvider.get).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenLastCalledWith(404);
    expect(res.json).toHaveBeenLastCalledWith({
      error: 'Error accessing crudService to get rawMaterialProductRelation',
    });
  });
});
