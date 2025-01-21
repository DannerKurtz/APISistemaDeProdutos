import { Request, Response } from 'express';
import { userController } from '../../../src/server/controllers/UserController';
import { IUsersWithoutId } from '../../../src/server/database/models/UsersInterface';
import { userProvider } from '../../../src/server/database/providers/UserProvider';

jest.mock('../../../src/server/database/providers/UserProvider', () => ({
  userProvider: {
    update: jest.fn(),
  },
}));

interface IData extends Omit<IUsersWithoutId, 'password'> {
  newPassword: string;
}
interface IParams {
  id: string;
}

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Update User Test', () => {
  test('Test 1 -> successful', async () => {
    (userProvider.update as jest.Mock).mockReturnValue({
      id: '123',
      name: 'Teste',
    });

    const req = {
      params: {
        id: '123',
      },
      body: {
        name: 'Teste',
        newPassword: '123456',
      },
    } as Request<IParams, {}, IData>;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await userController.update(req, res);

    expect(userProvider.update).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      userUpdated: {
        id: '123',
        name: 'Teste',
      },
    });
  });

  test('Test 2 -> failed', async () => {
    (userProvider.update as jest.Mock).mockReturnValue(
      Error('Error updating user')
    );

    const req = {
      params: {
        id: '123',
      },
      body: {
        name: 'Teste',
        newPassword: '123456',
      },
    } as Request<IParams, {}, IData>;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await userController.update(req, res);

    expect(userProvider.update).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Error updating user',
    });
  });
});
