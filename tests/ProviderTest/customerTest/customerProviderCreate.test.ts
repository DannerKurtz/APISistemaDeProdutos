import { customerProvider } from '../../../src/server/database/providers/CustomerProvider';
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

describe('Create Client Provider', () => {
  test('Test 1 -> successful', async () => {
    const { id, ...data } = dataExemple;

    (crudService.createInDatabase as jest.Mock).mockResolvedValue(dataExemple);

    const result = await customerProvider.create(data);

    expect(result).toEqual(dataExemple);
    expect(crudService.createInDatabase).toHaveBeenCalledTimes(1);
  });

  test('Test 2 -> failed', async () => {
    const data = dataExemple;

    (crudService.createInDatabase as jest.Mock).mockResolvedValue(
      errorsCrudService.createMessage('Customers')
    );

    const result = await customerProvider.create(data);

    expect(result).toEqual(errorsCrudService.createMessage('Customers'));
    expect(crudService.createInDatabase).toHaveBeenCalledTimes(1);
  });
});
