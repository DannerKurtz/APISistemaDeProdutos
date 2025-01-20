import { clientsProvider } from '../../../src/server/database/providers/ClientsProvider';
import { crudService } from '../../../src/server/shared/services/prismaHelpers/CRUD';

const dataExemple = {
  nome: 'Example Name',
  cep: '12345-678',
  cidade: 'Example City',
  cpf_cnpj: '123.456.789-00',
  inscricao_estadual: '123456789',
  endereco: '123 Example St',
  bairro: 'Example Neighborhood',
  numero: '123',
  nome_do_contato: 'Contact Name',
  telefone: '(12) 3456-7890',
  celular: '(12) 98765-4321',
  email: 'example@example.com',
};

jest.mock('../../../src/server/shared/services/CRUD', () => ({
  crudService: {
    updateInDatabase: jest.fn(),
  },
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Update Client Provider', () => {
  test('Test 1 -> successful', async () => {
    const id = '321asd1f23a3df21';
    const data = dataExemple;

    (crudService.updateInDatabase as jest.Mock).mockReturnValue(data);

    const result = await clientsProvider.update(id, data);
    expect(result).toEqual(data);
    expect(crudService.updateInDatabase).toHaveBeenCalledTimes(1);
  });

  test('Test 2 -> failed', async () => {
    const id = '321asd1f23a3df21';
    const data = dataExemple;

    (crudService.updateInDatabase as jest.Mock).mockReturnValue(
      'Erro ao atualizar o cliente'
    );

    const result = await clientsProvider.update(id, data);

    expect(result).toEqual('Erro ao atualizar o cliente');
    expect(crudService.updateInDatabase).toHaveBeenCalledTimes(1);
  });
});
