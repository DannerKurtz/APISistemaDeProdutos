import { rawMaterialProductRelationProvider } from '../../../src/server/database/providers/RawMaterialProductRelationProvider';
import { crudService } from '../../../src/server/shared/services/CRUD';

jest.mock('../../../src/server/shared/services/CRUD', () => ({
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
      produtoId: 'abc123',
      materiaPrimaId: 'abc123',
      quantidadeMateriaPrima: 10,
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
      produtoId: 'abc123',
      materiaPrimaId: 'abc123',
      quantidadeMateriaPrima: 10,
    };

    (crudService.createInDatabase as jest.Mock).mockResolvedValue(
      Error('Erro ao criar nova relação de materia prima e produto')
    );

    const result = await rawMaterialProductRelationProvider.create(data);

    expect(result).toEqual(
      Error('Erro ao criar nova relação de materia prima e produto')
    );
    expect(crudService.createInDatabase).toHaveBeenCalledTimes(1);
  });
});
