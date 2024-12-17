import { Request, Response } from 'express';
import { clientsController } from '../../../src/server/controllers/CustomerController';
import { IClient } from '../../../src/server/database/models/CustomersInterface';
import { clientsProvider } from '../../../src/server/database/providers/ClientsProvider';

jest.mock('../../../src/server/database/providers/ClientsProvider', () => ({
  clientsProvider: {
    update: jest.fn(),
  },
}));

interface IParams {
  id: string;
}

interface IBodyProps extends Omit<IClient, 'id'> {}

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

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Get Client Test', () => {
  test('Test 1 -> successful', async () => {
    (clientsProvider.update as jest.Mock).mockReturnValue(dataExemple);
    const req = {
      params: {
        id: '123',
      },
      body: dataExemple,
    } as unknown as Request<IParams, {}, IBodyProps>;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await clientsController.update(req, res);

    expect(clientsProvider.update).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ updateClient: dataExemple });
  });
  test('Test 2 -> failed', async () => {
    (clientsProvider.update as jest.Mock).mockReturnValue(
      Error('Erro ao acessar o crudService para atualizar o cliente!')
    );
    const req = {
      params: {
        id: '123',
      },
      body: dataExemple,
    } as unknown as Request<IParams, {}, IBodyProps>;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await clientsController.update(req, res);

    expect(clientsProvider.update).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      Error('Erro ao acessar o crudService para atualizar o cliente!')
    );
  });
});
