import { IUsersWithoutId } from '../../../src/server/database/models/UsersInterface';
import { userProvider } from '../../../src/server/database/providers/UserProvider';
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

describe('Create User Provider', () => {
  test('Test 1 -> successful', async () => {
    const data: IUsersWithoutId = {
      name: 'Teste',
      password: '123456',
    };

    (crudService.createInDatabase as jest.Mock).mockResolvedValue({
      id: '321asd1f23a3df21',
      name: 'Teste',
    });

    const result = await userProvider.create(data);

    expect(result).toEqual({
      id: '321asd1f23a3df21',
      name: 'Teste',
    });
    expect(crudService.createInDatabase).toHaveBeenCalledTimes(1);
  });

  test('Test 2 -> failed', async () => {
    const data: IUsersWithoutId = {
      name: 'Teste',
      password: '123456',
    };

    (crudService.createInDatabase as jest.Mock).mockReturnValue(
      Error(errorsCrudService.createMessage('Users'))
    );

    const result = await userProvider.create(data);

    expect(result).toEqual(Error(errorsCrudService.createMessage('Users')));
    expect(crudService.createInDatabase).toHaveBeenCalledTimes(1);
  });
});
