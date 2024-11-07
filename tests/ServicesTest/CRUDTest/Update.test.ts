import { prisma } from "../../../src/server/database/prisma";
import { bcryptPassword } from "../../../src/server/shared/services/bcrypt";
import { crudService } from "../../../src/server/shared/services/CRUD";

jest.mock("../../../src/server/database/prisma", () => ({
  prisma: {
    usuario: {
      findFirst: jest.fn(),
      update: jest.fn(),
    },
  },
}));

jest.mock("../../../src/server/shared/services/bcrypt", () => ({
  bcryptPassword: {
    passwordHashed: jest.fn().mockReturnValue("password_hashed"),
    passwordVerify: jest.fn(),
  },
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Get Test Service", () => {
  test("Test 01 -> successful", async () => {
    const params = "123";
    const data = {
      nome: "Teste",
      senha: "123",
    };
    (prisma.usuario.findFirst as jest.Mock).mockReturnValue(true);
    (prisma.usuario.update as jest.Mock).mockReturnValue(data);
    (bcryptPassword.passwordVerify as jest.Mock).mockReturnValue(true);
    const result = await crudService.updateInDatabase(
      params,
      data,
      "usuario",
      "Error"
    );

    expect(result).toEqual(data);
    expect(prisma.usuario.findFirst).toHaveBeenCalledTimes(1);
    expect(prisma.usuario.update).toHaveBeenCalledTimes(1);
    expect(bcryptPassword.passwordVerify).toHaveBeenCalledTimes(1);
    expect(bcryptPassword.passwordHashed).toHaveBeenCalledTimes(0);
  });

  test("Test 02 -> successful with novaSenha", async () => {
    const params = "123";
    const data = {
      nome: "Teste",
      senha: "123",
      novaSenha: "321",
    };
    const { novaSenha, ...dateWithoutNewPassword } = data;
    dateWithoutNewPassword.senha = "password_hashed";
    (prisma.usuario.findFirst as jest.Mock).mockReturnValue(true);
    (prisma.usuario.update as jest.Mock).mockReturnValue(
      dateWithoutNewPassword
    );
    (bcryptPassword.passwordVerify as jest.Mock).mockReturnValue(true);
    const result = await crudService.updateInDatabase(
      params,
      data,
      "usuario",
      "Error"
    );

    console.log("novo:", dateWithoutNewPassword, "resultado", result);
    expect(result).toEqual(dateWithoutNewPassword);
    expect(prisma.usuario.findFirst).toHaveBeenCalledTimes(1);
    expect(prisma.usuario.update).toHaveBeenCalledTimes(1);
    expect(bcryptPassword.passwordVerify).toHaveBeenCalledTimes(1);
    expect(bcryptPassword.passwordHashed).toHaveBeenCalledTimes(1);
  });
  
});
