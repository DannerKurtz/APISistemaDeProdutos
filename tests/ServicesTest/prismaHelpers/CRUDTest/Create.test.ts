import { IUsers } from '../../../../src/server/database/models/UsersInterface';
import { prisma } from '../../../../src/server/database/prisma';
import { bcryptPassword } from '../../../../src/server/shared/services/bcrypt';
import { crudService } from '../../../../src/server/shared/services/prismaHelpers/CRUD';

jest.mock('../../../../src/server/database/prisma', () => ({
  prisma: {
    users: {
      findFirst: jest.fn(),
      create: jest.fn(),
    },
  },
}));

jest.mock('../../../../src/server/shared/services/bcrypt', () => {
  return {
    bcryptPassword: {
      passwordHashed: jest.fn().mockResolvedValue('hashed_password'),
    },
  };
});

type TWithoutId<T> = Omit<IUsers, 'id'>;

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Create Service Test', () => {
  test('Test 1 -> successful', async () => {
    const data: TWithoutId<IUsers> = {
      name: 'Teste',
      password: '123456',
    };

    (prisma.users.findFirst as jest.Mock).mockResolvedValue(null);

    (prisma.users.create as jest.Mock).mockResolvedValue({
      id: '123-abc',
      name: 'Teste',
      password: 'hashed_password',
    });

    const result = await crudService.createInDatabase(data, 'users', 'Erro');

    expect(result).toEqual({
      id: '123-abc',
      name: 'Teste',
      password: 'hashed_password',
    });
    expect(prisma.users.findFirst).toHaveBeenCalledTimes(1);
    expect(prisma.users.create).toHaveBeenCalledTimes(1);
  });
  test('Test 2 -> failed with name exist', async () => {
    const data: TWithoutId<IUsers> = {
      name: 'Teste',
      password: '123456',
    };

    (prisma.users.findFirst as jest.Mock).mockReturnValue(
      Error('The name already exists')
    );

    const result = await crudService.createInDatabase(data, 'users', 'Erro');

    expect(result).toEqual(Error('The name already exists'));
    expect(prisma.users.findFirst).toHaveBeenCalledTimes(1);
    expect(prisma.users.create).toHaveBeenCalledTimes(0);
  });
  test('Test 3 -> failed', async () => {
    const data: TWithoutId<IUsers> = {
      name: 'Teste',
      password: '123456',
    };

    const message = 'Error';

    (prisma.users.findFirst as jest.Mock).mockReturnValue(null);
    (prisma.users.create as jest.Mock).mockReturnValue(message);

    const result = await crudService.createInDatabase(data, 'users', message);

    expect(result).toEqual(message);
    expect(prisma.users.findFirst).toHaveBeenCalledTimes(1);
    expect(prisma.users.create).toHaveBeenCalledTimes(1);
  });
});
