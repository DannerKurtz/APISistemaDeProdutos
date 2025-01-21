import { Request, Response } from 'express';
import { rawMaterialProvider } from '../../../src/server/database/providers/RawMaterialProvider';
import { rawMaterialController } from '../../../src/server/controllers/RawMaterialController';

jest.mock('../../../src/server/database/providers/RawMaterialProvider', () => ({
  rawMaterialProvider: {
    get: jest.fn(),
  },
}));

beforeEach(() => {
  jest.clearAllMocks();
});

const dataExemple = {
  id: '321asd1f23a3df21',
  name: 'Teste',
  price: 10,
  quantity: 10,
  unitWeight: 10,
};

describe('Get RawMaterial Test', () => {
  test('Test 01 -> successful', async () => {
    (rawMaterialProvider.get as jest.Mock).mockReturnValue(dataExemple);

    const req = {
      query: {
        id: '123',
        nome: null,
      },
    } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await rawMaterialController.get(req, res);

    expect(rawMaterialProvider.get).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ rawMaterialListed: dataExemple });
  });
  test('Test 02 -> failed', async () => {
    (rawMaterialProvider.get as jest.Mock).mockReturnValue(
      Error('Error getting raw material')
    );

    const req = {
      query: {
        id: '123',
        nome: null,
      },
    } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await rawMaterialController.get(req, res);

    expect(rawMaterialProvider.get).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Error getting raw material',
    });
  });
});
