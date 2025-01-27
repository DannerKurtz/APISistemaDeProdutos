import { rawMaterialProvider } from '../../../src/server/database/providers/RawMaterialProvider';
import { errorsCrudService } from '../../../src/server/shared/services/messageErrors';
import { crudService } from '../../../src/server/shared/services/prismaHelpers/CRUD';

jest.mock('../../../src/server/shared/services/prismaHelpers/CRUD', () => ({
  crudService: {
    deleteInDatabase: jest.fn(),
  },
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Delete RawMaterial Provider', () => {
  test('Teste 01 -> successful', async () => {
    (crudService.deleteInDatabase as jest.Mock).mockReturnValue(true);

    const result = await rawMaterialProvider.deleteRawMaterial('123');

    expect(crudService.deleteInDatabase).toHaveBeenCalledTimes(1);
    expect(result).toEqual(true);
  });
  test('Test 02 -> failed', async () => {
    (crudService.deleteInDatabase as jest.Mock).mockReturnValue(
      Error(errorsCrudService.deleteMessage('RawMaterials'))
    );

    const result = await rawMaterialProvider.deleteRawMaterial('123');

    expect(crudService.deleteInDatabase).toHaveBeenCalledTimes(1);
    expect(result).toEqual(
      Error(errorsCrudService.deleteMessage('RawMaterials'))
    );
  });
});
