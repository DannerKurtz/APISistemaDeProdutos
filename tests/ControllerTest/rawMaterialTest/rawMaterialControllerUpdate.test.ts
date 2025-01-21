import { Request, Response } from 'express';
import { rawMaterialController } from '../../../src/server/controllers/RawMaterialController';
import { rawMaterialProvider } from '../../../src/server/database/providers/RawMaterialProvider';
import { IRawMaterialsWithoutId } from '../../../src/server/database/models/RawMaterialsInterface';

jest.mock('../../../src/server/database/providers/RawMaterialProvider', () => ({
  rawMaterialProvider: {
    update: jest.fn(),
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
type IParams = {
  id: string;
};

describe('Update RawMaterial Test', () => {
  test('Test 01 -> successful', async () => {
    (rawMaterialProvider.update as jest.Mock).mockReturnValue(dataExemple);

    const { id, ...body } = dataExemple;

    const req = {
      params: {
        id,
      },
      body,
    } as unknown as Request<IParams, {}, IRawMaterialsWithoutId>;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await rawMaterialController.update(req, res);

    expect(rawMaterialProvider.update).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ rawMaterialUpdated: dataExemple });
  });

  test('Test 02 -> failed', async () => {
    (rawMaterialProvider.update as jest.Mock).mockReturnValue(
      Error('Error updating raw material')
    );

    const { id, ...body } = dataExemple;

    const req = {
      params: {
        id,
      },
      body,
    } as unknown as Request<IParams, {}, IRawMaterialsWithoutId>;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await rawMaterialController.update(req, res);

    expect(rawMaterialProvider.update).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Error updating raw material',
    });
  });
});
