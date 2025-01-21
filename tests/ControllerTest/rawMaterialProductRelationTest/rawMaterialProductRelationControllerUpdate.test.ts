import { Request, Response } from 'express';
import { IRawMaterialProductRelationsWithoutId } from '../../../src/server/database/models/RawMaterialProductRelationsInterface';
import { rawMaterialProductRelationProvider } from '../../../src/server/database/providers/RawMaterialProductRelationProvider';
import { rawMaterialProductRelationController } from '../../../src/server/controllers/RawMaterialProductRelationController';

jest.mock(
  '../../../src/server/database/providers/RawMaterialProductRelationProvider',
  () => ({
    rawMaterialProductRelationProvider: {
      update: jest.fn(),
    },
  })
);

beforeEach(() => {
  jest.clearAllMocks();
});

type IParams = {
  id: string;
};

const dataExemple = {
  id: '123',
  productId: '123456',
  rawMaterialId: '654321',
  rawMaterialQuantity: 10,
};

describe('Update RawMaterialProductRelation Test', () => {
  test('Test 01 -> successful', async () => {
    (rawMaterialProductRelationProvider.update as jest.Mock).mockReturnValue(
      dataExemple
    );

    const req = {
      params: {
        id: '123',
      },
      body: {
        productId: '123456',
        rawMaterialId: '654321',
        rawMaterialQuantity: 10,
      },
    } as unknown as Request<IParams, {}, IRawMaterialProductRelationsWithoutId>;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await rawMaterialProductRelationController.update(req, res);

    expect(rawMaterialProductRelationProvider.update).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenLastCalledWith(200);
    expect(res.json).toHaveBeenLastCalledWith({
      rawMaterialProductRelationUpdated: dataExemple,
    });
  });

  test('Test 02 -> failed', async () => {
    const newData = {
      materiaPrimaId: '321asd1f23a3df22',
      produtoId: '321asd1f23a3df22',
      quantidadeMateriaPrima: 10,
    };
    (rawMaterialProductRelationProvider.update as jest.Mock).mockReturnValue(
      Error('Error accessing crudService to update rawMaterialProductRelation')
    );

    const req = {
      params: {
        id: '123',
      },
      body: newData,
    } as unknown as Request<IParams, {}, IRawMaterialProductRelationsWithoutId>;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await rawMaterialProductRelationController.update(req, res);

    expect(rawMaterialProductRelationProvider.update).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenLastCalledWith(400);
    expect(res.json).toHaveBeenLastCalledWith({
      error: 'Error accessing crudService to update rawMaterialProductRelation',
    });
  });
});
