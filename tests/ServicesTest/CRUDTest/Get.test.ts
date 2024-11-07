import { prisma } from "../../../src/server/database/prisma";
import { crudService } from "../../../src/server/shared/services/CRUD";

jest.mock("../../../src/server/database/prisma", () => ({
  prisma: {
    usuario: {
      findFirst: jest.fn(),
      findMany: jest.fn(),
    },
  },
}));

type Query = {
  id?: string;
  nome?: string | object;
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Get Test Service ", () => {
  test("Test 01 -> successful with id", async () => {
    const query: Query = {
      id: "123",
      nome: undefined,
    };
    const data = {
      id: "123",
      nome: "Teste",
    };
    (prisma.usuario.findFirst as jest.Mock).mockReturnValue(data);

    const result = await crudService.getInDatabase(query, "usuario", "Erro");

    expect(result).toEqual(data);
    expect(prisma.usuario.findFirst).toHaveBeenCalledTimes(1);
    expect(prisma.usuario.findMany).toHaveBeenCalledTimes(0);
  });
  test("Test 02 -> successful with name", async () => {
    const query: Query = {
      id: undefined,
      nome: "Test",
    };
    const data = {
      id: "123",
      nome: "Teste",
    };

    (prisma.usuario.findMany as jest.Mock).mockReturnValue(data);

    const result = await crudService.getInDatabase(query, "usuario", "Erro");

    expect(result).toEqual(data);
    expect(prisma.usuario.findFirst).toHaveBeenCalledTimes(0);
    expect(prisma.usuario.findMany).toHaveBeenCalledTimes(1);
  });
  test("Test 03 -> failed", async () => {
    const query: Query = {
      id: undefined,
      nome: "Test",
    };

    (prisma.usuario.findMany as jest.Mock).mockReturnValue("Error");

    const result = await crudService.getInDatabase(query, "usuario", "Error");

    expect(result).toEqual("Error");
    expect(prisma.usuario.findFirst).toHaveBeenCalledTimes(0);
    expect(prisma.usuario.findMany).toHaveBeenCalledTimes(1);
  });
});
