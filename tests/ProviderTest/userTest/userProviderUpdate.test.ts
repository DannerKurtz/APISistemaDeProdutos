import { userProvider } from '../../../src/server/database/providers/UserProvider';
import { crudService } from '../../../src/server/shared/services/prismaHelpers/CRUD';

jest.mock('../../../src/server/shared/services/CRUD', () => ({
  crudService: {
    updateInDatabase: jest.fn(),
  },
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Update User Provider', () => {
  test('Test 1 -> successful', async () => {
    const id = '321asd1f23a3df21';
    const data = {
      nome: 'Teste',
      senha: '123456',
    };

    (crudService.updateInDatabase as jest.Mock).mockResolvedValue({
      id: '321asd1f23a3df21',
      nome: 'Teste',
    });

    const result = await userProvider.update(id, data);

    expect(result).toEqual({
      id: '321asd1f23a3df21',
      nome: 'Teste',
    });
    expect(crudService.updateInDatabase).toHaveBeenCalledTimes(1);
  });

  test('Test 2 -> failed', async () => {
    const id = '321asd1f23a3df21';
    const data = {
      nome: 'Teste',
      senha: '123456',
    };

    (crudService.updateInDatabase as jest.Mock).mockResolvedValue(
      'Erro ao atualizar o usuário'
    );

    const result = await userProvider.update(id, data);

    expect(result).toEqual('Erro ao atualizar o usuário');
    expect(crudService.updateInDatabase).toHaveBeenCalledTimes(1);
  });
});
