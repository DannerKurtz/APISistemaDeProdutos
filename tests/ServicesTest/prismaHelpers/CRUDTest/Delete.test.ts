import { prisma } from '../../../../src/server/database/prisma';
import { crudService } from '../../../../src/server/shared/services/prismaHelpers/CRUD';

jest.mock('../../../../src/server/database/prisma', () => ({
  prisma: {
    users: {
      delete: jest.fn(),
    },
  },
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Delete Test Service', () => {
  test('Test 01 -> successful', async () => {
    const id = '123';

    (prisma.users.delete as jest.Mock).mockResolvedValue(true);

    const result = await crudService.deleteInDatabase(id, 'users', 'Error');

    expect(result).toEqual(true);
    expect(prisma.users.delete).toHaveBeenCalledTimes(1);
  });

  test('Test 02 -> Failed, user not deleted', async () => {
    const id = '123';

    (prisma.users.delete as jest.Mock).mockResolvedValue(false);

    const result = await crudService.deleteInDatabase(id, 'users', 'Error');

    expect(result).toEqual(Error('Error'));
    expect(prisma.users.delete).toHaveBeenCalledTimes(1);
  });
});
