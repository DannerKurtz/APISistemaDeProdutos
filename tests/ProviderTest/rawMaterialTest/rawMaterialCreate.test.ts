import { rawMaterialProvider } from '../../../src/server/database/providers/RawMaterialProvider';
import { errorsCrudService } from '../../../src/server/shared/services/messageErrors';
import { crudService } from '../../../src/server/shared/services/prismaHelpers/CRUD';

jest.mock('../../../src/server/shared/services/prismaHelpers/CRUD', () => ({
  crudService: {
    createInDatabase: jest.fn(),
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

describe('Create RawMaterial Provider', () => {
  test('Test 01 -> successful', async () => {
    (crudService.createInDatabase as jest.Mock).mockReturnValue(data);

    const result = await rawMaterialProvider.create(data);

    expect(crudService.createInDatabase).toHaveBeenCalledTimes(1);
    expect(result).toEqual(data);
  });
  test('Test 01 -> failed', async () => {
    (crudService.createInDatabase as jest.Mock).mockReturnValue(
      Error(errorsCrudService.createMessage('RawMaterials'))
    );

    const result = await rawMaterialProvider.create(data);

    expect(crudService.createInDatabase).toHaveBeenCalledTimes(1);
    expect(result).toEqual(
      Error(errorsCrudService.createMessage('RawMaterials'))
    );
  });
});
