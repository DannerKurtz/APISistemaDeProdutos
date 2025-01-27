import { rawMaterialProvider } from '../../../src/server/database/providers/RawMaterialProvider';
import { errorsCrudService } from '../../../src/server/shared/services/messageErrors';
import { crudService } from '../../../src/server/shared/services/prismaHelpers/CRUD';

jest.mock('../../../src/server/shared/services/prismaHelpers/CRUD', () => ({
  crudService: {
    getInDatabase: jest.fn(),
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

describe('Get RawMaterial Provider', () => {
  test('Test 01 -> successful', async () => {
    (crudService.getInDatabase as jest.Mock).mockResolvedValue(data);

    const id = '321asd1f23a3df21';

    const result = await rawMaterialProvider.get({ id });

    console.log(
      'Esse é o resultado: ',
      typeof result,
      'Esse é o data',
      typeof data
    );
    console.log(`Esse é o result: ${result}, já esse é o esperado ${data}`);
    expect(result).toEqual(data);
    expect(crudService.getInDatabase).toHaveBeenCalledTimes(1);
  });
  test('Test 02 -> failed', async () => {
    (crudService.getInDatabase as jest.Mock).mockReturnValue(
      Error(errorsCrudService.updateMessage('RawMaterials'))
    );

    const id = '123';
    let nome;

    const result = await rawMaterialProvider.get({ id });

    expect(result).toEqual(
      Error(errorsCrudService.updateMessage('RawMaterials'))
    );
    expect(crudService.getInDatabase).toHaveBeenCalledTimes(1);
  });
});
