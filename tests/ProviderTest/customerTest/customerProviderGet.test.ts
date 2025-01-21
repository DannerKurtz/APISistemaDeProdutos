import { customerProvider } from '../../../src/server/database/providers/CustomerProvider';
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

const dataExemple = {
  id: '123456',
  name: 'Example Name',
  postalCode: '12345-678',
  city: 'Example City',
  taxId: '123.456.789-00',
  stateRegistration: '123456789',
  address: '123 Example St',
  neighborhood: 'Example Neighborhood',
  addressNumber: '123',
  contactName: 'Contact Name',
  phone: '(12) 3456-7890',
  mobile: '(12) 98765-4321',
  email: 'example@example.com',
};

describe('Get Client Provider', () => {
  test('Test 1 -> successful', async () => {
    const id = '321asd1f23a3df21';
    (crudService.getInDatabase as jest.Mock).mockResolvedValue(dataExemple);

    const result = await customerProvider.get({ id });

    expect(result).toEqual(dataExemple);
    expect(crudService.getInDatabase).toHaveBeenCalledTimes(1);
  });

  test('Test 2 -> failed', async () => {
    const id = '321asd1f23a3df21';
    (crudService.getInDatabase as jest.Mock).mockResolvedValue(
      errorsCrudService.getMessage('Customers')
    );

    const result = await customerProvider.get({ id });

    expect(result).toEqual(errorsCrudService.getMessage('Customers'));
    expect(crudService.getInDatabase).toHaveBeenCalledTimes(1);
  });
});
