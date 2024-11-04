import { bcryptPassword } from "../../../src/server/shared/services/bcrypt";
import { prisma } from "../../../src/server/database/prisma";
import { userProvider } from "../../../src/server/database/providers/UserProvider";

jest.mock("../../../src/server/database/prisma", () => ({
  prisma: {
    usuario: {
      findFirst: jest.fn(),
      create: jest.fn(),
    },
  },
}));

jest.mock("../../../src/server/shared/services/bcrypt", () => ({
  bcryptPassword: {
    passwordHashed: jest.fn().mockResolvedValue("hashed_password"),
  },
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Create User in Database", () => {
  test("Test 1 -> Successful", async () => {
    const data = { nome: "Teste", senha: "123", permissionId: null };

    (prisma.usuario.create as jest.Mock).mockResolvedValue({
      id: "123-abc",
      ...data,
      senha: "hashed_password",
    });

    const result = await userProvider.create(data);

    expect(prisma.usuario.findFirst).toHaveBeenCalledWith({
      where: { nome: data.nome },
    });

    expect(prisma.usuario.create).toHaveBeenCalledWith({
      data: {
        ...data,
        senha: "hashed_password",
        id: expect.any(String),
      },
    });

    expect(result).toEqual({
      id: "123-abc",
      nome: "Teste",
      senha: "hashed_password",
      permissionId: null,
    });
  });

  test("Test 2 -> Failed", async () => {
    const data = { nome: "Teste", senha: "123", permissionId: null };

    (prisma.usuario.findFirst as jest.Mock).mockResolvedValue({
      id: "123-abc",
      ...data,
      senha: "hashed_password",
    });

    const result = await userProvider.create(data);

    expect(result).toEqual(Error("Usuário já existente!"));
  });
});
