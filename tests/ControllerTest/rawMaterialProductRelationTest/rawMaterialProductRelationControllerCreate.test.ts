import { Request, Response } from 'express';
import { rawMaterialProductRelationController } from '../../../src/server/controllers/RawMaterialProductRelationController';
import { rawMaterialProductRelationProvider } from '../../../src/server/database/providers/RawMaterialProductRelationProvider';
import { IRawMaterialProductRelationsWithoutId } from '../../../src/server/database/models/RawMaterialProductRelationsInterface';

jest.mock(
  '../../../src/server/database/providers/RawMaterialProductRelationProvider',
  () => ({
    rawMaterialProductRelationProvider: {
      create: jest.fn(),
    },
  })
);

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Create RawMaterialProductRelation Test', () => {
  test('Test 01 -> successful', async () => {
    const data = {
      materiaPrimaId: '321asd1f23a3df21',
      produtoId: '321asd1f23a3df21',
      quantidadeMateriaPrima: 10,
    };
    (rawMaterialProductRelationProvider.create as jest.Mock).mockReturnValue({
      id: '321asd1f23a3df21',
      ...data,
    });

    const req = {
      body: { ...data },
    } as unknown as Request<{}, {}, IRawMaterialProductRelationsWithoutId>;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await rawMaterialProductRelationController.create(req, res);

    expect(rawMaterialProductRelationProvider.create).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenLastCalledWith(201);
    expect(res.json).toHaveBeenLastCalledWith({
      rawMaterialProductRelationCreated: {
        id: '321asd1f23a3df21',
        ...data,
      },
    });
  });

  test('Test 02 -> error', async () => {
    const data = {
      materiaPrimaId: '321asd1f23a3df21',
      produtoId: '321asd1f23a3df21',
      quantidadeMateriaPrima: 10,
    };
    (rawMaterialProductRelationProvider.create as jest.Mock).mockReturnValue(
      new Error('Error creating rawMaterialProductRelation')
    );

    const req = {
      body: { ...data },
    } as unknown as Request<{}, {}, IRawMaterialProductRelationsWithoutId>;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await rawMaterialProductRelationController.create(req, res);

    expect(rawMaterialProductRelationProvider.create).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenLastCalledWith(409);
    expect(res.json).toHaveBeenLastCalledWith({
      error: 'Error creating rawMaterialProductRelation',
    });
  });
});
