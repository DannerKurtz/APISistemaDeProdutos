import { Request, Response } from "express";
import { clientsController } from "../../../src/server/controllers/ClientsController";

interface IParams {
  id: string;
}

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Delete Client Test", () => {
  test("Test 1 -> successful", async () => {
    jest
      .spyOn(clientsController, "deleteClient")
      .mockImplementation(async (req: Request<IParams>, res: Response) => {
        return res.status(200).json({
          deleted: true,
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

    await clientsController.deleteClient(req, res);

    expect(clientsController.deleteClient).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      deleted: true,
    });
  });

  test("Test 2 -> failed", async () => {
    jest
      .spyOn(clientsController, "deleteClient")
      .mockImplementation(async (req: Request<IParams>, res: Response) => {
        return res.status(404).json({
          clientDelete: "Cliente não encontrado!",
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

    await clientsController.deleteClient(req, res);

    expect(clientsController.deleteClient).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      clientDelete: "Cliente não encontrado!",
    });
  });
});
