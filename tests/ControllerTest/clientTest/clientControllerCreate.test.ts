import { Request, Response } from 'express';
import { clientsController } from '../../../src/server/controllers/CustomerController';
import { clientsProvider } from '../../../src/server/database/providers/ClientsProvider';

jest.mock('../../../src/server/database/providers/ClientsProvider', () => ({
  clientsProvider: {
    create: jest.fn(),
  },
}));

beforeEach(() => {
  jest.clearAllMocks();
});

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

describe('Create Cliente Controller', () => {
  test('Test 1 -> successful', async () => {
    (clientsProvider.create as jest.Mock).mockReturnValue(dataExemple);

    const req = { body: dataExemple } as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await clientsController.create(req, res);

    expect(clientsProvider.create).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ newClient: dataExemple });
  });

  test('Test 2 -> failed', async () => {
    (clientsProvider.create as jest.Mock).mockReturnValue(
      Error('Cliente ja existe!')
    );

    const req = { body: dataExemple } as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await clientsController.create(req, res);

    expect(clientsProvider.create).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith(Error('Cliente ja existe!'));
  });
});
