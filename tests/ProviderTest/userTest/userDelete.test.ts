import { prisma } from "../../../src/server/database/prisma";
import { userProvider } from "../../../src/server/database/providers/UserProvider";

jest.mock("../../../src/server/database/prisma", () => ({
  prisma: {
    usuario: {
      delete: jest.fn(),
    },
  },
}));

describe("Delete User in Database", () => {
  test("Test 1 -> Successful", async () => {
    const id = "123-abc";
    (prisma.usuario.delete as jest.Mock).mockResolvedValue({
      id: "123-abc",
    });

    const result = await userProvider.deleteUser(id);

    expect(prisma.usuario.delete).toHaveBeenCalledWith({
      where: { id }
    });

    expect(result).toEqual(true);
  });

  test("Test 2 -> Failed", async () => {
    const id = "123-abc";
    (prisma.usuario.delete as jest.Mock).mockResolvedValue(null);

    const result = await userProvider.deleteUser(id);

    expect(prisma.usuario.delete).toHaveBeenCalledWith({
      where: { id }
    });
    expect(result).toEqual(new Error("Erro ao deletar o usuário"));
    expect(result).toBeInstanceOf(Error);
  });
});
