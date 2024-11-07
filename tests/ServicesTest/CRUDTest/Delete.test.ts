import { prisma } from "../../../src/server/database/prisma";
import { crudService } from "../../../src/server/shared/services/CRUD";

jest.mock("../../../src/server/database/prisma", () => ({
  prisma: {
    usuario: {
      delete: jest.fn(),
    },
  },
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Delete Test Service", () => {
  test("Test 01 -> successful", async () => {
    const id = "123";

    (prisma.usuario.delete as jest.Mock).mockReturnValue(true);

    const result = await crudService.deleteInDatabase(id, "usuario", "Error");

    expect(result).toEqual(true);
    expect(prisma.usuario.delete).toHaveBeenCalledTimes(1);
  });

  test("Test 02 -> Failed, user not deleted", async () => {
    const id = "123";

    (prisma.usuario.delete as jest.Mock).mockReturnValue(false);

    const result = await crudService.deleteInDatabase(id, "usuario", "Error");

    expect(result).toEqual(Error("Error"));
    expect(prisma.usuario.delete).toHaveBeenCalledTimes(1);
  });
});
