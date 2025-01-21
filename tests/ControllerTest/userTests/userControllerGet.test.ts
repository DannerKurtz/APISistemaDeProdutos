import { Request, Response } from 'express';
import { userController } from '../../../src/server/controllers/UserController';
import { userProvider } from '../../../src/server/database/providers/UserProvider';

jest.mock('../../../src/server/database/providers/UserProvider', () => ({
  userProvider: {
    get: jest.fn(),
  },
}));

interface IQuery {
  id: string;
  name: string;
}

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Get User Test', () => {
  test('Test 1 -> get with id users successful', async () => {
    (userProvider.get as jest.Mock).mockReturnValue({
      id: '123',
      name: 'Teste',
    });

    const req = {
      query: {
        id: '123',
      },
    } as Request<{}, {}, {}, IQuery>;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await userController.get(req, res);

    expect(userProvider.get).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      userListed: {
        id: '123',
        name: 'Teste',
      },
    });
  });
  test('Test 2 -> get with name users successful', async () => {
    (userProvider.get as jest.Mock).mockReturnValue({
      id: '123',
      name: 'Teste',
    });

    const req = {
      query: {
        name: 'Teste',
      },
    } as Request<{}, {}, {}, IQuery>;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await userController.get(req, res);

    expect(userProvider.get).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      userListed: {
        id: '123',
        name: 'Teste',
      },
    });
  });
});
