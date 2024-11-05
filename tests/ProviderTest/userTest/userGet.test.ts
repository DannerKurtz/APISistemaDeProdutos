import { prisma } from "../../../src/server/database/prisma";
import { userProvider } from "../../../src/server/database/providers/UserProvider";

jest.mock("../../../src/server/database/prisma", () => ({
  prisma: {
    usuario: {
      findMany: jest.fn(),
    },
  },
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Get User in Database", () => {
  test("Test 1 -> Get with id Successful", async () => {
    const id = "123-abc";
    let nome = null;
    (prisma.usuario.findMany as jest.Mock).mockResolvedValue([
      {
        id: "123-abc",
        nome: "Teste",
      },
    ]);

    const result = await userProvider.get(id, nome);

    expect(prisma.usuario.findMany).toHaveBeenCalledWith({
      where: { id },
      select: {
        id: true,
        nome: true,
      },
    });
    expect(result).toEqual([
      {
        id: "123-abc",
        nome: "Teste",
      },
    ]);
    expect(result).not.toBeNull();
  });
  test("Test 2 -> Get with nome Successful", async () => {
    let id = null;
    const nome = "Teste";
    (prisma.usuario.findMany as jest.Mock).mockResolvedValue([
      {
        id: "123-abc",
        nome: "Teste",
      },
    ]);

    const result = await userProvider.get(id, nome);

    expect(prisma.usuario.findMany).toHaveBeenCalledWith({
      where: { nome: { contains: nome, mode: "insensitive"} },
      select: {
        id: true,
        nome: true,
      },
    });
    expect(result).toEqual([
      {
        id: "123-abc",
        nome: "Teste",
      },
    ]);
    expect(result).not.toBeNull();
  });
});
