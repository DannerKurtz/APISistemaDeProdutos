import { Request, Response } from "express";
import { rawMaterialController } from "../../../src/server/controllers/RawMaterialController";
import { RawMaterialModel } from "../../../src/server/database/models/RawMaterialModel";
import { rawMaterialProvider } from "../../../src/server/database/providers/RawMaterialProvider";

jest.mock("../../../src/server/database/providers/RawMaterialProvider", () => ({
  rawMaterialProvider: {
    create: jest.fn(),
  },
}));

type TWithoutID = Omit<RawMaterialModel, "id">;

const data = {
  id: "321asd1f23a3df21",
  name: "Teste",
  price: 10,
  quantity: 10,
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Create RawMaterial Test", () => {
  test("Test 1 -> successful", async () => {
    (rawMaterialProvider.create as jest.Mock).mockReturnValue(data);

    const req = {
      name: "Teste",
      price: 10,
      quantity: 10,
    } as unknown as Request<{}, {}, TWithoutID>;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await rawMaterialController.create(req, res);

    expect(rawMaterialProvider.create).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(data);
  });
  test("Test 2 -> failed", async () => {
    (rawMaterialProvider.create as jest.Mock).mockReturnValue(
      Error("RawMaterial ja existe!")
    );
    const req = {
      name: "Teste",
      price: 10,
      quantity: 10,
    } as unknown as Request<{}, {}, TWithoutID>;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await rawMaterialController.create(req, res);

    expect(rawMaterialProvider.create).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(Error("RawMaterial ja existe!"));
  });
});
