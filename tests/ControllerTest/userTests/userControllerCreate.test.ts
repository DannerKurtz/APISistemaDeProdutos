import { Request, Response } from 'express';
import { userController } from '../../../src/server/controllers/UserController';
import { userProvider } from '../../../src/server/database/providers/UserProvider';

beforeEach(() => {
  jest.clearAllMocks();
});
jest.mock('../../../src/server/database/providers/UserProvider', () => ({
  userProvider: {
    create: jest.fn(),
  },
}));
describe('Create User Test', () => {
  test('Test 1 -> successful', async () => {
    (userProvider.create as jest.Mock).mockReturnValue({
      id: '321asd1f23a3df21',
      name: 'Teste',
    });
    const req = {
      body: {
        name: 'Teste',
        password: '123456',
      },
    } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await userController.create(req, res);

    expect(userProvider.create).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      userCreated: {
        id: '321asd1f23a3df21',
        name: 'Teste',
      },
    });
  });

  test('Test 2 -> failed', async () => {
    (userProvider.create as jest.Mock).mockReturnValue(
      Error('Error creating user')
    );

    const req = {
      body: {
        name: 'Teste',
        password: '123456',
      },
    } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await userController.create(req, res);

    expect(userProvider.create).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith({ error: 'Error creating user' });
  });
});
