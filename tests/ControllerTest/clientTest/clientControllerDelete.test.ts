import { Request, Response } from "express";
import { clientsController } from "../../../src/server/controllers/ClientsController";
import { clientsProvider } from "../../../src/server/database/providers/ClientsProvider";
import { deleteClient } from "../../../src/server/controllers/ClientsController/Delete";

jest.mock("../../../src/server/database/providers/ClientsProvider", () => ({
  clientsProvider: {
    deleteClient: jest.fn(),
  },
}));

interface IParams {
  id: string;
}

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Delete Client Test", () => {
  test("Test 1 -> successful", async () => {
    (clientsProvider.deleteClient as jest.Mock).mockReturnValue(true);

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

    expect(clientsProvider.deleteClient).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      deleteClient: true,
    });
  });

  test("Test 2 -> failed", async () => {
    (clientsProvider.deleteClient as jest.Mock).mockReturnValue(
      Error("Cliente não encontrado!")
    );

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

    expect(clientsProvider.deleteClient).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith(Error("Cliente não encontrado!"));
  });
});
