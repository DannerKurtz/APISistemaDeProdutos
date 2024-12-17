import { Request, Response } from 'express';
import { RawMaterialProductRelationModel } from '../../../src/server/database/models/RawMaterialProductRelationsInterface';
import { rawMaterialProductRelationProvider } from '../../../src/server/database/providers/RawMaterialProductRelation';
import { rawMaterialProductRelationController } from '../../../src/server/controllers/RawMaterialProductRelationController';

jest.mock(
  '../../../src/server/database/providers/RawMaterialProductRelation',
  () => ({
    rawMaterialProductRelationProvider: {
      update: jest.fn(),
    },
  })
);

beforeEach(() => {
  jest.clearAllMocks();
});

type RawMaterialProductRelationWithoutId = Omit<
  RawMaterialProductRelationModel,
  'id'
>;

type IParams = {
  id: string;
};

describe('Update RawMaterialProductRelation Test', () => {
  test('Test 01 -> successful', async () => {
    const newData = {
      materiaPrimaId: '321asd1f23a3df22',
      produtoId: '321asd1f23a3df22',
      quantidadeMateriaPrima: 10,
    };
    (rawMaterialProductRelationProvider.update as jest.Mock).mockReturnValue(
      newData
    );

    const req = {
      params: {
        id: '123',
      },
      body: newData,
    } as unknown as Request<IParams, {}, RawMaterialProductRelationWithoutId>;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await rawMaterialProductRelationController.update(req, res);

    expect(rawMaterialProductRelationProvider.update).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenLastCalledWith(200);
    expect(res.json).toHaveBeenLastCalledWith(newData);
  });

  test('Test 02 -> failed', async () => {
    const newData = {
      materiaPrimaId: '321asd1f23a3df22',
      produtoId: '321asd1f23a3df22',
      quantidadeMateriaPrima: 10,
    };
    (rawMaterialProductRelationProvider.update as jest.Mock).mockReturnValue(
      new Error(
        'Erro ao acessar o crudService para atualizar a relação de materia prima e produto!'
      )
    );

    const req = {
      params: {
        id: '123',
      },
      body: newData,
    } as unknown as Request<IParams, {}, RawMaterialProductRelationWithoutId>;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await rawMaterialProductRelationController.update(req, res);

    expect(rawMaterialProductRelationProvider.update).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenLastCalledWith(400);
    expect(res.json).toHaveBeenLastCalledWith(
      Error(
        'Erro ao acessar o crudService para atualizar a relação de materia prima e produto!'
      )
    );
  });
});
