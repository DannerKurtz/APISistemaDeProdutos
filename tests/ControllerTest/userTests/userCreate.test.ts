import { Request, Response } from "express";
import { userController } from "../../../src/server/controllers/UserController";

beforeEach(() => {
  jest.clearAllMocks(); // Limpa os mocks e as contagens de chamadas
});

describe("Create User Test", () => {
  test("Test 1 -> successful", async () => {
    jest
      .spyOn(userController, "create")
      .mockImplementation(async (req: Request, res: Response) => {
        return res.status(201).json({
          id: "321asd1f23a3df21",
          nome: "Teste",
        });
      });
    const req = {
      body: {
        nome: "Teste",
        senha: "123456",
      },
    } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await userController.create(req, res);

    expect(userController.create).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      id: "321asd1f23a3df21",
      nome: "Teste",
    });
  });

  test("Test 2 -> failed", async () => {
    jest
      .spyOn(userController, "create")
      .mockImplementation(async (req: Request, res: Response) => {
        return res.status(409).json("Usuário já existente!");
      });

    const req = {
      body: {
        nome: "Teste",
        senha: "123456",
      },
    } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await userController.create(req, res);

    expect(userController.create).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith("Usuário já existente!");
  });
});
