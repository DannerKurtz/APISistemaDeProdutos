import { clientsProvider } from '../../../src/server/database/providers/ClientsProvider';
import { crudService } from '../../../src/server/shared/services/prismaHelpers/CRUD';

jest.mock('../../../src/server/shared/services/CRUD', () => ({
  crudService: {
    deleteInDatabase: jest.fn(),
  },
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Delete Client Provider', () => {
  test('Test 1 -> successful', async () => {
    const id: string = '321asd1f23a3df21';

    (crudService.deleteInDatabase as jest.Mock).mockReturnValue(true);

    const result = await clientsProvider.deleteClient(id);

    expect(result).toEqual(true);
    expect(crudService.deleteInDatabase).toHaveBeenCalledTimes(1);
  });
  test('Test 2 -> failed', async () => {
    const id: string = '321asd1f23a3df21';

    (crudService.deleteInDatabase as jest.Mock).mockReturnValue(
      'Erro ao deletar o cliente'
    );

    const result = await clientsProvider.deleteClient(id);

    expect(result).toEqual('Erro ao deletar o cliente');
    expect(crudService.deleteInDatabase).toHaveBeenCalledTimes(1);
  });
});
