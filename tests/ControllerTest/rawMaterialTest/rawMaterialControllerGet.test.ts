import { query, Request, Response } from "express";
import { rawMaterialProvider } from "../../../src/server/database/providers/RawMaterialProvider";
import { rawMaterialController } from "../../../src/server/controllers/RawMaterialController";
import { json } from "stream/consumers";

jest.mock("../../../src/server/database/providers/RawMaterialProvider", () => ({
  rawMaterialProvider: {
    get: jest.fn(),
  },
}));

beforeEach(() => {
  jest.clearAllMocks();
});

const data = {
  id: "321asd1f23a3df21",
  name: "Teste",
  price: 10,
  quantity: 10,
};

describe("Get RawMaterial Test", () => {
  test("Test 01 -> successful", async () => {
    (rawMaterialProvider.get as jest.Mock).mockReturnValue(data);

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

    await rawMaterialController.get(req, res);

    expect(rawMaterialProvider.get).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(data);
  });
  test("Test 02 -> failed", async () => {
    (rawMaterialProvider.get as jest.Mock).mockReturnValue(
      Error("Erro ao acessar o crudService para buscar a materia prima!")
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

    await rawMaterialController.get(req, res);

    expect(rawMaterialProvider.get).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      getRawMaterial: Error(
        "Erro ao acessar o crudService para buscar a materia prima!"
      ),
    });
  });
});
