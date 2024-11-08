import { query, Request, Response } from "express";
import { clientsController } from "../../../src/server/controllers/ClientsController";
import { clientsProvider } from "../../../src/server/database/providers/ClientsProvider";

jest.mock("../../../src/server/database/providers/ClientsProvider", () => ({
  clientsProvider: {
    get: jest.fn(),
  },
}));

const dataExemple = {
  nome: "Example Name",
  cep: "12345-678",
  cidade: "Example City",
  cpf_cnpj: "123.456.789-00",
  inscricao_estadual: "123456789",
  endereco: "123 Example St",
  bairro: "Example Neighborhood",
  numero: "123",
  nome_do_contato: "Contact Name",
  telefone: "(12) 3456-7890",
  celular: "(12) 98765-4321",
  email: "example@example.com",
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Get Client Test", () => {
  test("Test 1 -> successful", async () => {
    (clientsProvider.get as jest.Mock).mockReturnValue(dataExemple);

    const req = {
      query: {
        id: "123",
        nome: null,
      },
    } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await clientsController.get(req, res);

    expect(clientsProvider.get).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ clients: dataExemple });
  });

  test("Test 2 -> failed", async () => {
    (clientsProvider.get as jest.Mock).mockReturnValue(
      Error("Erro ao acessar o crudService para buscar o cliente!")
    );

    const req = {
      query: {
        id: "123",
        nome: null,
      },
    } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await clientsController.get(req, res);

    expect(clientsProvider.get).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith(
      Error("Erro ao acessar o crudService para buscar o cliente!")
    );
  });
});
