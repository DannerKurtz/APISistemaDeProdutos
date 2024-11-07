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

describe("Create Cliente Controller", () => {
  test("Test 1 -> successful", async () => {
    jest
      .spyOn(clientsController, "create")
      .mockImplementation(async (req: Request, res: Response) => {
        return res.status(201).json(dataExemple);
      });

    const req = { body: dataExemple } as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await clientsController.create(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(dataExemple);
  });

  test("Test 2 -> failed", async () => {
    jest
      .spyOn(clientsController, "create")
      .mockImplementation(async (req: Request, res: Response) => {
        return res.status(409).json("Cliente ja existe!");
      });

    const req = { body: dataExemple } as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await clientsController.create(req, res);

    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith("Cliente ja existe!");
  });
});
