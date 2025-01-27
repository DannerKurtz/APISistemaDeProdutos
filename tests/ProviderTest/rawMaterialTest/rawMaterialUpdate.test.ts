import { rawMaterialProvider } from '../../../src/server/database/providers/RawMaterialProvider';
import { errorsCrudService } from '../../../src/server/shared/services/messageErrors';
import { crudService } from '../../../src/server/shared/services/prismaHelpers/CRUD';

jest.mock('../../../src/server/shared/services/prismaHelpers/CRUD', () => ({
  crudService: {
    updateInDatabase: jest.fn(),
  },
}));

beforeEach(() => {
  jest.clearAllMocks();
});

const data = {
  name: 'Teste',
  price: 10,
  unitWeight: 10,
};

describe('Update RawMaterial Provider', () => {
  test('Test 01 -> successful', async () => {
    (crudService.updateInDatabase as jest.Mock).mockReturnValue(data);

    const result = await rawMaterialProvider.update('123', data);

    expect(result).toEqual(data);
    expect(crudService.updateInDatabase).toHaveBeenCalledTimes(1);
  });
  test('Test 02 -> failed', async () => {
    (crudService.updateInDatabase as jest.Mock).mockReturnValue(
      Error(errorsCrudService.updateMessage('RawMaterials'))
    );

    const result = await rawMaterialProvider.update('123', data);

    expect(result).toEqual(
      Error(errorsCrudService.updateMessage('RawMaterials'))
    );
    expect(crudService.updateInDatabase).toHaveBeenCalledTimes(1);
  });
});
