import { rawMaterialProvider } from "../../../src/server/database/providers/RawMaterialProvider";
import { crudService } from "../../../src/server/shared/services/CRUD";

jest.mock("../../../src/server/shared/services/CRUD", () => ({
  crudService: {
    deleteInDatabase: jest.fn(),
  },
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Delete RawMaterial Provider", () => {
  test("Teste 01 -> successful", async () => {
    (crudService.deleteInDatabase as jest.Mock).mockReturnValue(true);

    const result = await rawMaterialProvider.deleteRawMaterial("123");

    expect(crudService.deleteInDatabase).toHaveBeenCalledTimes(1);
    expect(result).toEqual(true);
  });
  test("Test 02 -> failed", async () => {
    (crudService.deleteInDatabase as jest.Mock).mockReturnValue(Error("Error"));

    const result = await crudService.deleteInDatabase(
      "123",
      "MateriaPrima",
      "Erro"
    );

    expect(crudService.deleteInDatabase).toHaveBeenCalledTimes(1);
    expect(result).toEqual(Error("Error"));
  });
});
