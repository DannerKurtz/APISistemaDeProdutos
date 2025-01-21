import { Request, Response } from 'express';
import { rawMaterialController } from '../../../src/server/controllers/RawMaterialController';
import { rawMaterialProvider } from '../../../src/server/database/providers/RawMaterialProvider';
import {
  IRawMaterials,
  IRawMaterialsWithoutId,
} from '../../../src/server/database/models/RawMaterialsInterface';

jest.mock('../../../src/server/database/providers/RawMaterialProvider', () => ({
  rawMaterialProvider: {
    create: jest.fn(),
  },
}));

const dataExemple = {
  id: '321asd1f23a3df21',
  name: 'Teste',
  price: 10,
  quantity: 10,
  unitWeight: 10,
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Create RawMaterial Test', () => {
  test('Test 1 -> successful', async () => {
    (rawMaterialProvider.create as jest.Mock).mockReturnValue(dataExemple);

    const req = {
      name: 'Teste',
      price: 10,
      quantity: 10,
      unitWeight: 10,
    } as unknown as Request<{}, {}, IRawMaterialsWithoutId>;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await rawMaterialController.create(req, res);

    expect(rawMaterialProvider.create).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ rawMaterialCreated: dataExemple });
  });
  test('Test 2 -> failed', async () => {
    (rawMaterialProvider.create as jest.Mock).mockReturnValue(
      Error('Error creating raw material')
    );
    const req = {
      name: 'Teste',
      price: 10,
      quantity: 10,
      unitWeight: 10,
    } as unknown as Request<{}, {}, IRawMaterials>;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await rawMaterialController.create(req, res);

    expect(rawMaterialProvider.create).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Error creating raw material',
    });
  });
});
