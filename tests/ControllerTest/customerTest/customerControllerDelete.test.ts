import { Request, Response } from 'express';
import { customerController } from '../../../src/server/controllers/CustomerController';
import { customerProvider } from '../../../src/server/database/providers/CustomerProvider';

jest.mock('../../../src/server/database/providers/CustomerProvider', () => ({
  customerProvider: {
    deleteCustomer: jest.fn(),
  },
}));

interface IParams {
  id: string;
}

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Delete Client Test', () => {
  test('Test 1 -> successful', async () => {
    (customerProvider.deleteCustomer as jest.Mock).mockReturnValue(true);

    const req = {
      params: {
        id: '123',
      },
    } as unknown as Request<IParams>;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await customerController.deleteCustomer(req, res);

    expect(customerProvider.deleteCustomer).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      customerDeleted: true,
    });
  });

  test('Test 2 -> failed', async () => {
    (customerProvider.deleteCustomer as jest.Mock).mockReturnValue(
      Error('Cliente não encontrado!')
    );

    const req = {
      params: {
        id: '123',
      },
    } as unknown as Request<IParams>;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await customerController.deleteCustomer(req, res);

    expect(customerProvider.deleteCustomer).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Cliente não encontrado!' });
  });
});
