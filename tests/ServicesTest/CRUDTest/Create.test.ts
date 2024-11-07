import { userModel } from "../../../src/server/database/models/UserModel";
import { prisma } from "../../../src/server/database/prisma";
import { bcryptPassword } from "../../../src/server/shared/services/bcrypt";
import { crudService } from "../../../src/server/shared/services/CRUD";

jest.mock("../../../src/server/database/prisma", () => ({
  prisma: {
    usuario: {
      findFirst: jest.fn(),
      create: jest.fn(),
    },
  },
}));

jest.mock("../../../src/server/shared/services/bcrypt", () => {
  return {
    bcryptPassword: {
      passwordHashed: jest.fn().mockResolvedValue("hashed_password"),
    },
  };
});

type TWithoutId<T> = Omit<userModel, "id">;

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Create Service Test", () => {
  test("Test 1 -> successful", async () => {
    const data: TWithoutId<userModel> = {
      nome: "Teste",
      senha: "123456",
    };

    (prisma.usuario.findFirst as jest.Mock).mockResolvedValue(null);

    (prisma.usuario.create as jest.Mock).mockResolvedValue({
      id: "123-abc",
      nome: "Teste",
      senha: "hashed_password",
    });

    const result = await crudService.createInDatabase(data, "usuario", "Erro");

    expect(result).toEqual({
      id: "123-abc",
      nome: "Teste",
      senha: "hashed_password",
    });
    expect(prisma.usuario.findFirst).toHaveBeenCalledTimes(1);
    expect(prisma.usuario.create).toHaveBeenCalledTimes(1);
  });
  test("Test 2 -> failed with name exist", async () => {
    const data: TWithoutId<userModel> = {
      nome: "Teste",
      senha: "123456",
    };

    (prisma.usuario.findFirst as jest.Mock).mockReturnValue(
      Error("Este nome está em uso!")
    );

    const result = await crudService.createInDatabase(data, "usuario", "Erro");

    expect(result).toEqual(Error("Este nome está em uso!"));
    expect(prisma.usuario.findFirst).toHaveBeenCalledTimes(1);
    expect(prisma.usuario.create).toHaveBeenCalledTimes(0);
  });
  test("Test 3 -> failed", async () => {
    const data: TWithoutId<userModel> = {
      nome: "Teste",
      senha: "123456",
    };

    const message = "Error";

    (prisma.usuario.findFirst as jest.Mock).mockReturnValue(null);
    (prisma.usuario.create as jest.Mock).mockReturnValue(message);

    const result = await crudService.createInDatabase(data, "usuario", message);

    expect(result).toEqual(message);
    expect(prisma.usuario.findFirst).toHaveBeenCalledTimes(1);
    expect(prisma.usuario.create).toHaveBeenCalledTimes(1);
  });
});
