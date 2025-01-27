import { userProvider } from '../../../src/server/database/providers/UserProvider';
import { errorsCrudService } from '../../../src/server/shared/services/messageErrors';
import { crudService } from '../../../src/server/shared/services/prismaHelpers/CRUD';

jest.mock('../../../src/server/shared/services/prismaHelpers/CRUD', () => ({
  crudService: {
    deleteInDatabase: jest.fn(),
  },
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Delete User Provider', () => {
  test('Test 1 -> successful', async () => {
    const id: string = '321asd1f23a3df21';

    (crudService.deleteInDatabase as jest.Mock).mockReturnValue(true);

    const result = await userProvider.deleteUser(id);

    expect(result).toEqual(true);
    expect(crudService.deleteInDatabase).toHaveBeenCalledTimes(1);
  });

  test('Test 2 -> failed', async () => {
    const id: string = '321asd1f23a3df21';

    (crudService.deleteInDatabase as jest.Mock).mockReturnValue(
      Error(errorsCrudService.deleteMessage('Users'))
    );

    const result = await userProvider.deleteUser(id);

    expect(result).toEqual(Error(errorsCrudService.deleteMessage('Users')));
    expect(crudService.deleteInDatabase).toHaveBeenCalledTimes(1);
  });
});
