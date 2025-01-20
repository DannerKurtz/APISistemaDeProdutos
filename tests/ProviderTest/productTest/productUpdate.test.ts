import { productProvider } from '../../../src/server/database/providers/ProductProvier';
import { crudService } from '../../../src/server/shared/services/prismaHelpers/CRUD';

jest.mock('../../../src/server/shared/services/CRUD', () => ({
  crudService: {
    updateInDatabase: jest.fn(),
  },
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Create Product Provider', () => {
  test('Test 1 -> successful', async () => {
    const id = '123';

    const data = {
      nome: 'Test 01',
      porcentagem: 15,
      valor: 10.5,
      quantidade: 2,
    };

    (crudService.updateInDatabase as jest.Mock).mockResolvedValue(data);

    const result = await productProvider.update(id, data);

    expect(result).toEqual(data);
    expect(crudService.updateInDatabase).toHaveBeenCalledTimes(1);
  });

  test('Test 2 -> failed', async () => {
    const id = '123';

    const data = {
      nome: 'Test 01',
      porcentagem: 15,
      valor: 10.5,
      quantidade: 2,
    };

    (crudService.updateInDatabase as jest.Mock).mockResolvedValue(
      Error('Erro ao atualizar o produto')
    );

    const result = await productProvider.update(id, data);

    expect(result).toEqual(Error('Erro ao atualizar o produto'));
    expect(crudService.updateInDatabase).toHaveBeenCalledTimes(1);
  });
});
