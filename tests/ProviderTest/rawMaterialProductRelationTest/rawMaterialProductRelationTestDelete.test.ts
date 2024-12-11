import { rawMaterialProductRelationProvider } from '../../../src/server/database/providers/RawMaterialProductRelation';
import { crudService } from '../../../src/server/shared/services/CRUD';

jest.mock('../../../src/server/shared/services/CRUD', () => ({
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
      Error('Erro ao deletar a relação de materia prima e produto')
    );

    const result =
      await rawMaterialProductRelationProvider.deleteRawMaterialProductRelation(
        id
      );

    expect(result).toEqual(
      Error('Erro ao deletar a relação de materia prima e produto')
    );
    expect(crudService.deleteInDatabase).toHaveBeenCalledTimes(1);
  });
});
