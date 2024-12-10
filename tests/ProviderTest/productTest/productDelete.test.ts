import { ProductModel } from '../../../src/server/database/models/ProductModel';
import { productProvider } from '../../../src/server/database/providers/ProductProvier';
import { crudService } from '../../../src/server/shared/services/CRUD';

jest.mock('../../../src/server/shared/services/CRUD', () => ({
  crudService: {
    deleteInDatabase: jest.fn(),
  },
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Create Product Provider', () => {
  test('Test 1 -> successful', async () => {
    const id = '123';

    (crudService.deleteInDatabase as jest.Mock).mockResolvedValue(true);

    const result = await productProvider.deleteProduct(id);

    expect(result).toEqual(true);
    expect(crudService.deleteInDatabase).toHaveBeenCalledTimes(1);
  });

  test('Test 2 -> failed', async () => {
    const id = '123';

    (crudService.deleteInDatabase as jest.Mock).mockResolvedValue(
      Error(
        'rro ao deletar produto, verifique se não há relação com a materia prima'
      )
    );

    const result = await productProvider.deleteProduct(id);

    expect(result).toEqual(
      Error(
        'rro ao deletar produto, verifique se não há relação com a materia prima'
      )
    );
    expect(crudService.deleteInDatabase).toHaveBeenCalledTimes(1);
  });
});
