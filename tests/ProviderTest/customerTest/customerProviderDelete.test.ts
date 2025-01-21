import { customerProvider } from '../../../src/server/database/providers/CustomerProvider';
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

describe('Delete Client Provider', () => {
  test('Test 1 -> successful', async () => {
    const id: string = '321asd1f23a3df21';

    (crudService.deleteInDatabase as jest.Mock).mockReturnValue(true);

    const result = await customerProvider.deleteCustomer(id);

    expect(result).toEqual(true);
    expect(crudService.deleteInDatabase).toHaveBeenCalledTimes(1);
  });

  test('Test 2 -> failed', async () => {
    const id: string = '321asd1f23a3df21';

    (crudService.deleteInDatabase as jest.Mock).mockReturnValue(
      errorsCrudService.deleteMessage('Customers')
    );

    const result = await customerProvider.deleteCustomer(id);

    expect(result).toEqual(errorsCrudService.deleteMessage('Customers'));
    expect(crudService.deleteInDatabase).toHaveBeenCalledTimes(1);
  });
});
