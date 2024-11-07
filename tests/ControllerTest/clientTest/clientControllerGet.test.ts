import { Request, Response } from "express";
import { clientsController } from "../../../src/server/controllers/ClientsController";

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
    jest
      .spyOn(clientsController, "get")
      .mockImplementation(async (req: Request, res: Response) => {
        return res.status(200).json(dataExemple);
      });

    const req = {} as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await clientsController.get(req, res);

    expect(clientsController.get).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(dataExemple);
  });

  test("Test 2 -> failed", async () => {
    jest
      .spyOn(clientsController, "get")
      .mockImplementation(async (req: Request, res: Response) => {
        return res.status(404).json({
          clientGet: "Cliente nao encontrado!",
        });
      });
    const req = {} as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await clientsController.get(req, res);

    expect(clientsController.get).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(404);
  });
});
