import { rawMaterialProvider } from "../../../src/server/database/providers/RawMaterialProvider";
import { crudService } from "../../../src/server/shared/services/CRUD";

jest.mock("../../../src/server/shared/services/CRUD", () => ({
  crudService: {
    getInDatabase: jest.fn(),
  },
}));

beforeEach(() => {
  jest.clearAllMocks();
});

const data = {
  nome: "Teste",
  preco: 10,
  quantidade: 10,
};

describe("Get RawMaterial Provider", () => {
  test("Test 01 -> successful", async () => {
    (crudService.getInDatabase as jest.Mock).mockResolvedValue(data);

    const id = "321asd1f23a3df21";
    let nome;

    const result = await rawMaterialProvider.get(id, nome);

    console.log(
      "Esse é o resultado: ",
      typeof result,
      "Esse é o data",
      typeof data
    );
    console.log(`Esse é o result: ${result}, já esse é o esperado ${data}`);
    expect(result).toEqual(data);
    expect(crudService.getInDatabase).toHaveBeenCalledTimes(1);
  });
  test("Test 02 -> failed", async () => {
    (crudService.getInDatabase as jest.Mock).mockReturnValue(Error("Error"));

    const id = "123";
    let nome;

    const result = await rawMaterialProvider.get(id, nome);

    expect(result).toEqual(Error("Error"));
    expect(crudService.getInDatabase).toHaveBeenCalledTimes(1);
  });
});
