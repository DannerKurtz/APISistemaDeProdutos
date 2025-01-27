import { userProvider } from '../../../src/server/database/providers/UserProvider';
import { errorsCrudService } from '../../../src/server/shared/services/messageErrors';
import { crudService } from '../../../src/server/shared/services/prismaHelpers/CRUD';

jest.mock('../../../src/server/shared/services/prismaHelpers/CRUD', () => ({
  crudService: {
    updateInDatabase: jest.fn(),
  },
}));

beforeEach(() => {
  jest.clearAllMocks();
});

const dataExemple = {
  name: 'Teste',
  password: '123456',
  newPassword: '123457',
};

describe('Update User Provider', () => {
  test('Test 1 -> successful', async () => {
    const id = '321asd1f23a3df21';

    (crudService.updateInDatabase as jest.Mock).mockResolvedValue({
      id: '321asd1f23a3df21',
      name: 'Teste',
    });

    const result = await userProvider.update(id, dataExemple);

    expect(result).toEqual({
      id: '321asd1f23a3df21',
      name: 'Teste',
    });
    expect(crudService.updateInDatabase).toHaveBeenCalledTimes(1);
  });

  test('Test 2 -> failed', async () => {
    const id = '321asd1f23a3df21';

    (crudService.updateInDatabase as jest.Mock).mockResolvedValue(
      Error(errorsCrudService.getMessage('Users'))
    );

    const result = await userProvider.update(id, dataExemple);

    expect(result).toEqual(Error(errorsCrudService.getMessage('Users')));
    expect(crudService.updateInDatabase).toHaveBeenCalledTimes(1);
  });
});
