import { Request, Response } from 'express';
import { customerController } from '../../../src/server/controllers/CustomerController';
import { customerProvider } from '../../../src/server/database/providers/CustomerProvider';

jest.mock('../../../src/server/database/providers/CustomerProvider', () => ({
  customerProvider: {
    create: jest.fn(),
  },
}));

beforeEach(() => {
  jest.clearAllMocks();
});

const dataExemple = {
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

describe('Create Cliente Controller', () => {
  test('Test 1 -> successful', async () => {
    (customerProvider.create as jest.Mock).mockReturnValue({
      id: '123456',
      ...dataExemple,
    });

    const req = { body: dataExemple } as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await customerController.create(req, res);

    expect(customerProvider.create).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      customerCreated: { id: '123456', ...dataExemple },
    });
  });

  test('Test 2 -> failed', async () => {
    (customerProvider.create as jest.Mock).mockReturnValue(
      Error('Error creating customer')
    );

    const req = { body: dataExemple } as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await customerController.create(req, res);

    expect(customerProvider.create).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith({ error: 'Error creating customer' });
  });
});
