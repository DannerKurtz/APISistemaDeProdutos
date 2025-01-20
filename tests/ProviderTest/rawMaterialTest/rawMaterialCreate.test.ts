import { RawMaterialModel } from '../../../src/server/database/models/RawMaterialsInterface';
import { rawMaterialProvider } from '../../../src/server/database/providers/RawMaterialProvider';
import { crudService } from '../../../src/server/shared/services/prismaHelpers/CRUD';

jest.mock('../../../src/server/shared/services/CRUD', () => ({
  crudService: {
    createInDatabase: jest.fn(),
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

describe('Create RawMaterial Provider', () => {
  test('Test 01 -> successful', async () => {
    (crudService.createInDatabase as jest.Mock).mockReturnValue(data);

    const result = await rawMaterialProvider.create(data);

    expect(crudService.createInDatabase).toHaveBeenCalledTimes(1);
    expect(result).toEqual(data);
  });
  test('Test 01 -> failed', async () => {
    (crudService.createInDatabase as jest.Mock).mockReturnValue(Error('Erro'));

    const result = await rawMaterialProvider.create(data);

    expect(crudService.createInDatabase).toHaveBeenCalledTimes(1);
    expect(result).toEqual(Error('Erro'));
  });
});
