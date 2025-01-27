import { prisma } from '../../../../src/server/database/prisma';
import { crudService } from '../../../../src/server/shared/services/prismaHelpers/CRUD';

jest.mock('../../../../src/server/database/prisma', () => ({
  prisma: {
    users: {
      findFirst: jest.fn(),
      findMany: jest.fn(),
    },
  },
}));

type Query = {
  id?: string;
  nome?: string | object;
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Get Test Service ', () => {
  test('Test 01 -> successful with id', async () => {
    const query: Query = {
      id: '123',
      nome: undefined,
    };
    const data = {
      id: '123',
      nome: 'Teste',
    };
    (prisma.users.findFirst as jest.Mock).mockReturnValue(data);

    const result = await crudService.getInDatabase(query, 'users', 'Erro');

    expect(result).toEqual(data);
    expect(prisma.users.findFirst).toHaveBeenCalledTimes(1);
    expect(prisma.users.findMany).toHaveBeenCalledTimes(0);
  });
  test('Test 02 -> successful with name', async () => {
    const query: Query = {
      id: undefined,
      nome: 'Test',
    };
    const data = {
      id: '123',
      nome: 'Teste',
    };

    (prisma.users.findMany as jest.Mock).mockReturnValue(data);

    const result = await crudService.getInDatabase(query, 'users', 'Erro');

    expect(result).toEqual(data);
    expect(prisma.users.findFirst).toHaveBeenCalledTimes(0);
    expect(prisma.users.findMany).toHaveBeenCalledTimes(1);
  });
  test('Test 03 -> failed', async () => {
    const query: Query = {
      id: undefined,
      nome: 'Test',
    };

    (prisma.users.findMany as jest.Mock).mockReturnValue('Error');

    const result = await crudService.getInDatabase(query, 'users', 'Error');

    expect(result).toEqual('Error');
    expect(prisma.users.findFirst).toHaveBeenCalledTimes(0);
    expect(prisma.users.findMany).toHaveBeenCalledTimes(1);
  });
});
