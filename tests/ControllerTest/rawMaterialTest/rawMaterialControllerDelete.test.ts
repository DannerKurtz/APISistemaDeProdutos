import { Request, Response } from "express";
import { rawMaterialController } from "../../../src/server/controllers/RawMaterialController";

describe("Delete RawMaterial Test", () => {
  test("Test 01 -> successful", async () => {
    jest
      .spyOn(rawMaterialController, "deleteRawMaterial")
      .mockImplementation(async (req: Request, res: Response) => {
        return res.status(200).json(true);
      });
    const req = {
      params: {
        id: "123",
      },
    } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await rawMaterialController
  });
});
