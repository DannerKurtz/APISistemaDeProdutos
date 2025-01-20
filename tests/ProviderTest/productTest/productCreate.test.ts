import { ProductModel } from '../../../src/server/database/models/ProductsInterface';
import { productProvider } from '../../../src/server/database/providers/ProductProvier';
import { crudService } from '../../../src/server/shared/services/prismaHelpers/CRUD';

jest.mock('../../../src/server/shared/services/CRUD', () => ({
  crudService: {
    createInDatabase: jest.fn(),
  },
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Create Product Provider', () => {
  test('Test 1 -> successful', async () => {
    const data = {
      nome: 'Test 01',
      porcentagem: 15,
      valor: 10.5,
      quantidade: 2,
    };

    (crudService.createInDatabase as jest.Mock).mockResolvedValue(data);

    const result = await productProvider.create(data);

    expect(result).toEqual(data);
    expect(crudService.createInDatabase).toHaveBeenCalledTimes(1);
  });

  test('Test 2 -> failed', async () => {
    const data = {
      nome: 'Test 01',
      porcentagem: 15,
      valor: 10.5,
      quantidade: 2,
    };

    (crudService.createInDatabase as jest.Mock).mockResolvedValue(
      Error('Erro ao criar novo produto')
    );

    const result = await productProvider.create(data);

    expect(result).toEqual(Error('Erro ao criar novo produto'));
    expect(crudService.createInDatabase).toHaveBeenCalledTimes(1);
  });
});
