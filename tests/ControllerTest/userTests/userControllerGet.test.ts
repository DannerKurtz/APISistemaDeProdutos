import { Request, Response } from "express";
import { userController } from "../../../src/server/controllers/UserController";

interface IFilter {
  id: string;
  nome: string;
}

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Get User Test", () => {
  test("Test 1 -> get with id users successful", async () => {
    jest
      .spyOn(userController, "get")
      .mockImplementation(
        async (req: Request<{}, {}, {}, IFilter>, res: Response) => {
          return res.status(200).json({
            id: "123",
            nome: "Teste",
          });
        }
      );

    const req = {
      query: {
        id: "123",
      },
    } as Request<{}, {}, {}, IFilter>;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await userController.get(req, res);

    expect(userController.get).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      id: "123",
      nome: "Teste",
    });
  });
  test("Test 2 -> get with name users successful", async () => {
    jest
      .spyOn(userController, "get")
      .mockImplementation(
        async (req: Request<{}, {}, {}, IFilter>, res: Response) => {
          return res.status(200).json({
            id: "123",
            nome: "Teste",
          });
        }
      );

    const req = {
      query: {
        nome: "Teste",
      },
    } as Request<{}, {}, {}, IFilter>;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await userController.get(req, res);

    expect(userController.get).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      id: "123",
      nome: "Teste",
    });
  });
});
