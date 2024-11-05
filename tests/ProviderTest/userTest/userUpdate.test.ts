import { prisma } from "../../../src/server/database/prisma";
import { userProvider } from "../../../src/server/database/providers/UserProvider";
import { bcryptPassword } from "../../../src/server/shared/services/bcrypt";

jest.mock("../../../src/server/database/prisma", () => ({
  prisma: {
    usuario: {
      update: jest.fn(),
      findUnique: jest.fn(),
    },
  },
}));

jest.mock("../../../src/server/shared/services/bcrypt", () => ({
  bcryptPassword: {
    passwordHashed: jest.fn().mockResolvedValue("hashed_password"),
    passwordVerify: jest.fn().mockResolvedValue(true), // Mock para verificar a senha
  },
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Update User in Database", () => {
  test("Test 1 -> successful", async () => {
    const id = "123-abc";
    const data = { nome: "Teste", senha: "123", novaSenha: "novaSenha" };

    (prisma.usuario.findUnique as jest.Mock).mockResolvedValue({
      id: "123-abc",
      senha: "hashed_password",
    });

    (prisma.usuario.update as jest.Mock).mockResolvedValue({
      id: "123-abc",
      nome: "Teste",
      senha: "hashed_password",
    });

    const result = await userProvider.update(id, data);

    expect(prisma.usuario.update).toHaveBeenCalledWith({
      where: { id },
      data: {
        nome: data.nome,
        senha: "hashed_password",
      },
      select: {
        id: true,
        nome: true,
      },
    });

    expect(result).toEqual({
      id: "123-abc",
      nome: "Teste",
      senha: "hashed_password",
    });
  });

  test("Test 2 -> Failed", async () => {
    const id = "123-abc";
    const data = { nome: "Teste", senha: "123", novaSenha: "novaSenha" };

    (prisma.usuario.findUnique as jest.Mock).mockResolvedValue(null);

    const result = await userProvider.update(id, data);

    expect(result).toBeInstanceOf(Error);

    expect(result).toEqual(new Error("Usuário não encontrado!"));

    expect(prisma.usuario.update).not.toHaveBeenCalled();
  });
});
