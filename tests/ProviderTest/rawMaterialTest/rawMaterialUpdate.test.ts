import { RawMaterialModel } from '../../../src/server/database/models/RawMaterialsInterface';
import { rawMaterialProvider } from '../../../src/server/database/providers/RawMaterialProvider';
import { crudService } from '../../../src/server/shared/services/prismaHelpers/CRUD';

jest.mock('../../../src/server/shared/services/CRUD', () => ({
  crudService: {
    updateInDatabase: jest.fn(),
  },
}));

beforeEach(() => {
  jest.clearAllMocks();
});

const data = {
  nome: 'Teste',
  preco: 10,
  quantidade: 10,
};

describe('Update RawMaterial Provider', () => {
  test('Test 01 -> successful', async () => {
    (crudService.updateInDatabase as jest.Mock).mockReturnValue(data);

    const result = await rawMaterialProvider.update('123', data);

    expect(result).toEqual(data);
    expect(crudService.updateInDatabase).toHaveBeenCalledTimes(1);
  });
  test('Test 02 -> failed', async () => {
    (crudService.updateInDatabase as jest.Mock).mockReturnValue(Error('Error'));

    const result = await rawMaterialProvider.update('123', data);

    expect(result).toEqual(Error('Error'));
    expect(crudService.updateInDatabase).toHaveBeenCalledTimes(1);
  });
});
