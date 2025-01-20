import { rawMaterialProductRelationProvider } from '../../../src/server/database/providers/RawMaterialProductRelationProvider';
import { crudService } from '../../../src/server/shared/services/prismaHelpers/CRUD';

jest.mock('../../../src/server/shared/services/CRUD', () => ({
  crudService: {
    getInDatabase: jest.fn(),
  },
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Get RawMaterialProductRelation Test', () => {
  test('Test 1 -> successful', async () => {
    const id = '123';

    const data = {
      produtoId: 'abc123',
      materiaPrimaId: 'abc123',
      quantidadeMateriaPrima: 10,
    };

    (crudService.getInDatabase as jest.Mock).mockResolvedValue(data);

    const result = await rawMaterialProductRelationProvider.get(id);

    expect(result).toEqual(data);
    expect(crudService.getInDatabase).toHaveBeenCalledTimes(1);
  });

  test('Test 2 -> failed', async () => {
    const id = '123';
    (crudService.getInDatabase as jest.Mock).mockResolvedValue(
      Error('Erro ao buscar a relação de materia prima e produto!')
    );

    const result = await rawMaterialProductRelationProvider.get(id);

    expect(result).toEqual(
      Error('Erro ao buscar a relação de materia prima e produto!')
    );
    expect(crudService.getInDatabase).toHaveBeenCalledTimes(1);
  });
});
