import { Request, Response } from 'express';
import { customerController } from '../../../src/server/controllers/CustomerController';
import { customerProvider } from '../../../src/server/database/providers/CustomerProvider';

jest.mock('../../../src/server/database/providers/CustomerProvider', () => ({
  customerProvider: {
    get: jest.fn(),
  },
}));

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

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Get Client Test', () => {
  test('Test 1 -> successful', async () => {
    (customerProvider.get as jest.Mock).mockReturnValue(dataExemple);

    const req = {
      query: {
        id: '123',
        name: null,
      },
    } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await customerController.get(req, res);

    expect(customerProvider.get).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ customerListed: dataExemple });
  });

  test('Test 2 -> failed', async () => {
    (customerProvider.get as jest.Mock).mockReturnValue(
      Error('Error getting customers')
    );

    const req = {
      query: {
        id: '123',
        name: null,
      },
    } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await customerController.get(req, res);

    expect(customerProvider.get).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Error getting customers' });
  });
});
