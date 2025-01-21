import { Request, Response } from 'express';
import { customerController } from '../../../src/server/controllers/CustomerController';
import { ICustomersWithoutId } from '../../../src/server/database/models/CustomersInterface';
import { customerProvider } from '../../../src/server/database/providers/CustomerProvider';

jest.mock('../../../src/server/database/providers/CustomerProvider', () => ({
  customerProvider: {
    update: jest.fn(),
  },
}));

interface IParams {
  id: string;
}

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

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Get Client Test', () => {
  test('Test 1 -> successful', async () => {
    (customerProvider.update as jest.Mock).mockReturnValue({
      id: '123456',
      ...dataExemple,
    });
    const req = {
      params: {
        id: '123456',
      },
      body: dataExemple,
    } as unknown as Request<IParams, {}, ICustomersWithoutId>;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await customerController.update(req, res);

    expect(customerProvider.update).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      customerUpdated: { id: '123456', ...dataExemple },
    });
  });
  test('Test 2 -> failed', async () => {
    (customerProvider.update as jest.Mock).mockReturnValue(
      Error('Error updating customer')
    );
    const req = {
      params: {
        id: '123',
      },
      body: dataExemple,
    } as unknown as Request<IParams, {}, ICustomersWithoutId>;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await customerController.update(req, res);

    expect(customerProvider.update).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Error updating customer',
    });
  });
});
