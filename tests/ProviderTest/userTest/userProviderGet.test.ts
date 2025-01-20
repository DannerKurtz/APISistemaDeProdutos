import { userProvider } from '../../../src/server/database/providers/UserProvider';
import { crudService } from '../../../src/server/shared/services/prismaHelpers/CRUD';

jest.mock('../../../src/server/shared/services/CRUD', () => ({
  crudService: {
    getInDatabase: jest.fn(),
  },
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Get User Provider', () => {
  test('Test 1 -> successful', async () => {
    const id = '321asd1f23a3df21';
    let nome;
    (crudService.getInDatabase as jest.Mock).mockResolvedValue({
      id: '321asd1f23a3df21',
      nome: 'Teste',
    });

    const result = await userProvider.get(id, nome);

    expect(result).toEqual({
      id: '321asd1f23a3df21',
      nome: 'Teste',
    });
    expect(crudService.getInDatabase).toHaveBeenCalledTimes(1);
  });
  test('Test 2 -> failed', async () => {
    const id = '321asd1f23a3df21';
    let nome;
    (crudService.getInDatabase as jest.Mock).mockResolvedValue(
      'Erro ao buscar o usuário'
    );

    const result = await userProvider.get(id, nome);

    expect(result).toEqual('Erro ao buscar o usuário');
    expect(crudService.getInDatabase).toHaveBeenCalledTimes(1);
  });
});
