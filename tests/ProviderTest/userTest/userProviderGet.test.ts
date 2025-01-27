import { userProvider } from '../../../src/server/database/providers/UserProvider';
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

describe('Get User Provider', () => {
  test('Test 1 -> successful', async () => {
    const id = '321asd1f23a3df21';

    (crudService.getInDatabase as jest.Mock).mockResolvedValue({
      id: '321asd1f23a3df21',
      name: 'Teste',
    });

    const result = await userProvider.get({ id });

    expect(result).toEqual({
      id: '321asd1f23a3df21',
      name: 'Teste',
    });
    expect(crudService.getInDatabase).toHaveBeenCalledTimes(1);
  });
  test('Test 2 -> failed', async () => {
    const id = '321asd1f23a3df21';

    (crudService.getInDatabase as jest.Mock).mockResolvedValue(
      Error(errorsCrudService.getMessage('Users'))
    );

    const result = await userProvider.get({ id });

    expect(result).toEqual(Error(errorsCrudService.getMessage('Users')));
    expect(crudService.getInDatabase).toHaveBeenCalledTimes(1);
  });
});
