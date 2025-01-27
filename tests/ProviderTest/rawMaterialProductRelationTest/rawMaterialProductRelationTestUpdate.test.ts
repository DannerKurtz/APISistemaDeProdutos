import { rawMaterialProductRelationProvider } from '../../../src/server/database/providers/RawMaterialProductRelationProvider';
import { crudService } from '../../../src/server/shared/services/prismaHelpers/CRUD';

jest.mock('../../../src/server/shared/services/prismaHelpers/CRUD', () => ({
  crudService: {
    updateInDatabase: jest.fn(),
  },
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Update RawMaterialProductRelation Test', () => {
  test('Test 1 -> successful', async () => {
    const id = '123';

    const data = {
      productId: 'abc123',
      rawMaterialId: 'abc321',
      rawMaterialQuantity: 10,
    };

    (crudService.updateInDatabase as jest.Mock).mockResolvedValue(data);

    const result = await rawMaterialProductRelationProvider.update(id, data);

    expect(result).toEqual(data);
    expect(crudService.updateInDatabase).toHaveBeenCalledTimes(1);
  });

  test('Test 2 -> failed', async () => {
    const id = '123';

    const data = {
      productId: 'abc123',
      rawMaterialId: 'abc123',
      rawMaterialQuantity: 10,
    };

    (crudService.updateInDatabase as jest.Mock).mockResolvedValue(
      Error('Erro ao atualizar a relação de materia prima e produto')
    );

    const result = await rawMaterialProductRelationProvider.update(id, data);

    expect(result).toEqual(
      Error('Erro ao atualizar a relação de materia prima e produto')
    );
    expect(crudService.updateInDatabase).toHaveBeenCalledTimes(1);
  });
});
