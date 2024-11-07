import { userProvider } from "../../../src/server/database/providers/UserProvider";
import { crudService } from "../../../src/server/shared/services/CRUD";

jest.mock("../../../src/server/shared/services/CRUD", () => ({
  crudService: {
    deleteInDatabase: jest.fn(),
  },
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Delete User Provider", () => {
  test("Test 1 -> successful", async () => {
    const id: string = "321asd1f23a3df21";

    (crudService.deleteInDatabase as jest.Mock).mockReturnValue(true);

    const result = await userProvider.deleteUser(id);

    expect(result).toEqual(true);
    expect(crudService.deleteInDatabase).toHaveBeenCalledTimes(1);
  });

  test("Test 2 -> failed", async () => {
    const id: string = "321asd1f23a3df21";

    (crudService.deleteInDatabase as jest.Mock).mockReturnValue(
      "Erro ao deletar o usuário"
    );

    const result = await userProvider.deleteUser(id);

    expect(result).toEqual("Erro ao deletar o usuário");
    expect(crudService.deleteInDatabase).toHaveBeenCalledTimes(1);
  });
});
