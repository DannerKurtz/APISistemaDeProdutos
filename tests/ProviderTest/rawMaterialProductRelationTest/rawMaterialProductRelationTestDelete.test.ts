import { rawMaterialProductRelationProvider } from '../../../src/server/database/providers/RawMaterialProductRelationProvider';
import { errorsCrudService } from '../../../src/server/shared/services/messageErrors';
import { crudService } from '../../../src/server/shared/services/prismaHelpers/CRUD';

jest.mock('../../../src/server/shared/services/prismaHelpers/CRUD', () => ({
  crudService: {
    deleteInDatabase: jest.fn(),
  },
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Delete RawMaterialProductRelation Provider', () => {
  test('Test 1 -> successful', async () => {
    const id = '123';

    (crudService.deleteInDatabase as jest.Mock).mockResolvedValue(true);

    const result =
      await rawMaterialProductRelationProvider.deleteRawMaterialProductRelation(
        id
      );

    expect(result).toEqual(true);
    expect(crudService.deleteInDatabase).toHaveBeenCalledTimes(1);
  });

  test('Test 2 -> failed', async () => {
    const id = '123';

    (crudService.deleteInDatabase as jest.Mock).mockResolvedValue(
      Error(errorsCrudService.deleteMessage('RawMaterialProductRelations'))
    );

    const result =
      await rawMaterialProductRelationProvider.deleteRawMaterialProductRelation(
        id
      );

    expect(result).toEqual(
      Error(errorsCrudService.deleteMessage('RawMaterialProductRelations'))
    );
    expect(crudService.deleteInDatabase).toHaveBeenCalledTimes(1);
  });
});
