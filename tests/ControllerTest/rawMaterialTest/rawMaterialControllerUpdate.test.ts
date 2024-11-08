import { Request, Response } from "express";
import { rawMaterialController } from "../../../src/server/controllers/RawMaterialController";
import { RawMaterialModel } from "../../../src/server/database/models/RawMaterialModel";
import { rawMaterialProvider } from "../../../src/server/database/providers/RawMaterialProvider";

jest.mock("../../../src/server/database/providers/RawMaterialProvider", () => ({
  rawMaterialProvider: {
    update: jest.fn(),
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

type TWithoutID = Omit<RawMaterialModel, "id">;
type IParams = {
  id: string;
};

describe("Update RawMaterial Test", () => {
  test("Test 01 -> successful", async () => {
    (rawMaterialProvider.update as jest.Mock).mockReturnValue(data);

    const { id, ...body } = data;

    const req = {
      params: {
        id,
      },
      body,
    } as unknown as Request<IParams, {}, TWithoutID>;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await rawMaterialController.update(req, res);

    expect(rawMaterialProvider.update).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(data);
  });

  test("Test 02 -> failed", async () => {
    (rawMaterialProvider.update as jest.Mock).mockReturnValue(
      Error("Erro ao acessar o crudService para atualizar a materia prima!")
    );

    const { id, ...body } = data;

    const req = {
      params: {
        id,
      },
      body,
    } as unknown as Request<IParams, {}, TWithoutID>;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await rawMaterialController.update(req, res);

    expect(rawMaterialProvider.update).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      Error("Erro ao acessar o crudService para atualizar a materia prima!")
    );
  });
});
