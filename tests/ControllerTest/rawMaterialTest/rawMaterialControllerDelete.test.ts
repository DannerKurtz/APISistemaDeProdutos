import { Request, Response } from 'express';
import { rawMaterialController } from '../../../src/server/controllers/RawMaterialController';
import { rawMaterialProvider } from '../../../src/server/database/providers/RawMaterialProvider';

jest.mock('../../../src/server/database/providers/RawMaterialProvider', () => ({
  rawMaterialProvider: {
    deleteRawMaterial: jest.fn(),
  },
}));

beforeEach(() => {
  jest.clearAllMocks();
});

type Params = {
  id: string;
};

describe('Delete RawMaterial Test', () => {
  test('Test 01 -> successful', async () => {
    (rawMaterialProvider.deleteRawMaterial as jest.Mock).mockReturnValue(true);

    const req = {
      params: {
        id: '123',
      },
    } as unknown as Request<Params>;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await rawMaterialController.deleteRawMaterial(req, res);

    expect(rawMaterialProvider.deleteRawMaterial).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ rawMaterialDeleted: true });
  });

  test('Test 02 -> failed', async () => {
    (rawMaterialProvider.deleteRawMaterial as jest.Mock).mockReturnValue(
      Error('Error deleting raw material')
    );

    const req = {
      params: {
        id: '123',
      },
    } as unknown as Request<Params>;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await rawMaterialController.deleteRawMaterial(req, res);

    expect(rawMaterialProvider.deleteRawMaterial).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Error deleting raw material',
    });
  });
});
