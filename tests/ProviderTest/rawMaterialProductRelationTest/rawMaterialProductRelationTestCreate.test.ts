import { rawMaterialProductRelationProvider } from '../../../src/server/database/providers/RawMaterialProductRelationProvider';
import { errorsCrudService } from '../../../src/server/shared/services/messageErrors';
import { crudService } from '../../../src/server/shared/services/prismaHelpers/CRUD';

jest.mock('../../../src/server/shared/services/prismaHelpers/CRUD', () => ({
  crudService: {
    createInDatabase: jest.fn(),
  },
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Create RawMaterialProductRelation Provider', () => {
  test('Test 1 -> successful', async () => {
    const data = {
      productId: 'abc123',
      rawMaterialId: 'abc321',
      rawMaterialQuantity: 10,
    };

    (crudService.createInDatabase as jest.Mock).mockResolvedValue({
      id: '123',
      ...data,
    });

    const result = await rawMaterialProductRelationProvider.create(data);

    expect(result).toEqual({ id: '123', ...data });
    expect(crudService.createInDatabase).toHaveBeenCalledTimes(1);
  });

  test('Test 2 -> failed', async () => {
    const data = {
      productId: 'abc123',
      rawMaterialId: 'abc321',
      rawMaterialQuantity: 10,
    };

    (crudService.createInDatabase as jest.Mock).mockResolvedValue(
      Error(errorsCrudService.createMessage('RawMaterialProductRelation'))
    );

    const result = await rawMaterialProductRelationProvider.create(data);

    expect(result).toEqual(
      Error(errorsCrudService.createMessage('RawMaterialProductRelation'))
    );
    expect(crudService.createInDatabase).toHaveBeenCalledTimes(1);
  });
});
