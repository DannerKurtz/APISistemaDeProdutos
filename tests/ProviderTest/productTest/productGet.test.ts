import { productProvider } from '../../../src/server/database/providers/ProductProvier';
import { crudService } from '../../../src/server/shared/services/CRUD';

jest.mock('../../../src/server/shared/services/CRUD', () => ({
  crudService: {
    getInDatabase: jest.fn(),
  },
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Create Product Provider', () => {
  test('Test 1 -> successful', async () => {
    const query = {
      id: '123',
      nome: undefined,
    };

    const data = {
      nome: 'Test 01',
      porcentagem: 15,
      valor: 10.5,
      quantidade: 2,
    };

    (crudService.getInDatabase as jest.Mock).mockResolvedValue(data);

    const result = await productProvider.get(query);

    expect(result).toEqual(data);
    expect(crudService.getInDatabase).toHaveBeenCalledTimes(1);
  });

  test('Test 2 -> failed', async () => {
    const query = {
      id: '123',
      nome: undefined,
    };

    const data = {
      nome: 'Test 01',
      porcentagem: 15,
      valor: 10.5,
      quantidade: 2,
    };

    (crudService.getInDatabase as jest.Mock).mockResolvedValue(
      Error('Erro ao buscar produtos no banco de dados!')
    );

    const result = await productProvider.get(query);

    expect(result).toEqual(Error('Erro ao buscar produtos no banco de dados!'));
    expect(crudService.getInDatabase).toHaveBeenCalledTimes(1);
  });
});
