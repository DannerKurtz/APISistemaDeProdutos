import { rawMaterialProductRelationProvider } from '../../../src/server/database/providers/RawMaterialProductRelation';
import { crudService } from '../../../src/server/shared/services/CRUD';

jest.mock('../../../src/server/shared/services/CRUD', () => ({
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
      produtoId: 'abc123',
      materiaPrimaId: 'abc123',
      quantidadeMateriaPrima: 10,
    };

    (crudService.updateInDatabase as jest.Mock).mockResolvedValue(data);

    const result = await rawMaterialProductRelationProvider.update(id, data);

    expect(result).toEqual(data);
    expect(crudService.updateInDatabase).toHaveBeenCalledTimes(1);
  });

  test('Test 2 -> failed', async () => {
    const id = '123';

    const data = {
      produtoId: 'abc123',
      materiaPrimaId: 'abc123',
      quantidadeMateriaPrima: 10,
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
