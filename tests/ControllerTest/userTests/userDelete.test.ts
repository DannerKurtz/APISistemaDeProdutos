import { Request, Response } from "express";
import { userController } from "../../../src/server/controllers/UserController";

beforeEach(() => {
  jest.clearAllMocks();
});
interface IParams {
  id: string;
}
describe("Delete User Test", () => {
  test("Test 1 -> successful", async () => {
    jest
      .spyOn(userController, "deleteUser")
      .mockImplementation(async (req: Request<IParams>, res: Response) => {
        return res.status(200).json({
          deleted: true,
        });
      });

    const req = {
      params: {
        id: "123",
      },
    } as Request<IParams>; // Define params como { id: string }

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await userController.deleteUser(req, res);

    expect(userController.deleteUser).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      deleted: true,
    });
  });
  test("Test 2 -> failed", async () => {
    jest
      .spyOn(userController, "deleteUser")
      .mockImplementation(async (req: Request<IParams>, res: Response) => {
        return res.status(404).json({
          userDelete: "Usuário nao encontrado!",
        });
      });

    const req = {
      params: {
        id: "123",
      },
    } as unknown as Request<IParams>;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await userController.deleteUser(req, res);

    expect(userController.deleteUser).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      userDelete: "Usuário nao encontrado!",
    });
  });
});
