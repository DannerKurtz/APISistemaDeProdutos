import { Request, Response } from 'express';
import { userController } from '../../../src/server/controllers/UserController';
import { userProvider } from '../../../src/server/database/providers/UserProvider';

jest.mock('../../../src/server/database/providers/UserProvider', () => ({
  userProvider: {
    deleteUser: jest.fn(),
  },
}));

beforeEach(() => {
  jest.clearAllMocks();
});
interface IParams {
  id: string;
}
describe('Delete User Test', () => {
  test('Test 1 -> successful', async () => {
    (userProvider.deleteUser as jest.Mock).mockReturnValue(true);

    const req = {
      params: {
        id: '123',
      },
    } as Request<IParams>;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await userController.deleteUser(req, res);

    expect(userProvider.deleteUser).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      deleted: true,
    });
  });
  test('Test 2 -> failed', async () => {
    (userProvider.deleteUser as jest.Mock).mockReturnValue(
      Error('Usuário nao encontrado!')
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

    await userController.deleteUser(req, res);

    expect(userProvider.deleteUser).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      userDelete: Error('Usuário nao encontrado!'),
    });
  });
});
