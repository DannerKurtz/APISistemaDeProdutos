import { Request, Response } from 'express';
import { rawMaterialProductRelationProvider } from '../../../src/server/database/providers/RawMaterialProductRelation';
import { rawMaterialProductRelationController } from '../../../src/server/controllers/RawMaterialProductRelationController';
import { RawMaterialProductRelationModel } from '../../../src/server/database/models/RawMaterialProductRelation';

type IQuery = {
  id: string;
};

jest.mock(
  '../../../src/server/database/providers/RawMaterialProductRelation',
  () => ({
    rawMaterialProductRelationProvider: {
      get: jest.fn(),
    },
  })
);

beforeEach(() => {
  jest.clearAllMocks();
});

const data: RawMaterialProductRelationModel[] = [
  {
    id: '123',
    materiaPrimaId: '321asd1f23a3df21',
    produtoId: '321asd1f23a3df21',
    quantidadeMateriaPrima: 10,
  },
  {
    id: '124',
    materiaPrimaId: '321asd1f23a3df21',
    produtoId: '321asd1f23a3df21',
    quantidadeMateriaPrima: 10,
  },
];

describe('Get RawMaterialProductRelation Test', () => {
  test('Test 01 -> successful', async () => {
    (rawMaterialProductRelationProvider.get as jest.Mock).mockReturnValue(
      data[0]
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
      rawMaterialProductRelation: data[0],
    });
  });

  test('Test 02 -> successful', async () => {
    (rawMaterialProductRelationProvider.get as jest.Mock).mockReturnValue(data);

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
      rawMaterialProductRelation: data,
    });
  });

  test('Test 03 -> failed', async () => {
    (rawMaterialProductRelationProvider.get as jest.Mock).mockReturnValue(
      new Error(
        'Erro ao acessar o crudService para buscar a relação de materia prima e produto!'
      )
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
      rawMaterialProductRelation: Error(
        'Erro ao acessar o crudService para buscar a relação de materia prima e produto!'
      ),
    });
  });
});
