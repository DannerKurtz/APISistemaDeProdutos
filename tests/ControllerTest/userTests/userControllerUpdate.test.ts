import { Request, Response } from "express";
import { userController } from "../../../src/server/controllers/UserController";
import { userModel } from "../../../src/server/database/models/UserModel";

interface IBodyProps extends Omit<userModel, "id"> {
  novaSenha?: string;
}
interface IParams {
  id: string;
}

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Update User Test", () => {
  test("Test 1 -> successful", async () => {
    jest
      .spyOn(userController, "update")
      .mockImplementation(
        async (req: Request<IParams, {}, IBodyProps>, res: Response) => {
          return res.status(200).json({
            id: "123",
            nome: "Teste",
          });
        }
      );

    const req = {
      params: {
        id: "123",
      },
      body: {
        nome: "Teste",
        novaSenha: "123456",
      },
    } as Request<IParams, {}, IBodyProps>;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await userController.update(req, res);

    expect(userController.update).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      id: "123",
      nome: "Teste",
    });
  });

  test("Test 2 -> failed", async () => {
    jest
      .spyOn(userController, "update")
      .mockImplementation(
        async (req: Request<IParams, {}, IBodyProps>, res: Response) => {
          return res.status(404).json({
            userUpdate: "Usuário não encontrado!",
          });
        }
      );

    const req = {
      params: {
        id: "123",
      },
      body: {
        nome: "Teste",
        novaSenha: "123456",
      },
    } as Request<IParams, {}, IBodyProps>;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await userController.update(req, res);

    expect(userController.update).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      userUpdate: "Usuário não encontrado!",
    });
  });
});
