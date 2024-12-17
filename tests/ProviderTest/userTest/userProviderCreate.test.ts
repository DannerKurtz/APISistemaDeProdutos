import { userModel } from '../../../src/server/database/models/UsersInterface';
import { userProvider } from '../../../src/server/database/providers/UserProvider';
import { crudService } from '../../../src/server/shared/services/CRUD';

jest.mock('../../../src/server/shared/services/CRUD', () => ({
  crudService: {
    createInDatabase: jest.fn(),
  },
}));

type IUserWithoutId = Omit<userModel, 'id'>;

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Create User Provider', () => {
  test('Test 1 -> successful', async () => {
    const data: IUserWithoutId = {
      nome: 'Teste',
      senha: '123456',
    };

    (crudService.createInDatabase as jest.Mock).mockResolvedValue({
      id: '321asd1f23a3df21',
      nome: 'Teste',
    });

    const result = await userProvider.create(data);

    expect(result).toEqual({
      id: '321asd1f23a3df21',
      nome: 'Teste',
    });
    expect(crudService.createInDatabase).toHaveBeenCalledTimes(1);
  });

  test('Test 2 -> failed', async () => {
    const data: IUserWithoutId = {
      nome: 'Teste',
      senha: '123456',
    };

    (crudService.createInDatabase as jest.Mock).mockReturnValue(
      'Erro ao criar um novo usuário'
    );

    const result = await userProvider.create(data);

    expect(result).toEqual('Erro ao criar um novo usuário');
    expect(crudService.createInDatabase).toHaveBeenCalledTimes(1);
  });
});
