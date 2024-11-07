import { clientsProvider } from "../../../src/server/database/providers/ClientsProvider";
import { crudService } from "../../../src/server/shared/services/CRUD";

jest.mock("../../../src/server/shared/services/CRUD", () => ({
  crudService: {
    createInDatabase: jest.fn(),
  },
}));

beforeEach(() => {
  jest.clearAllMocks();
});

const dataExemple = {
  nome: "Example Name",
  cep: "12345-678",
  cidade: "Example City",
  cpf_cnpj: "123.456.789-00",
  inscricao_estadual: "123456789",
  endereco: "123 Example St",
  bairro: "Example Neighborhood",
  numero: "123",
  nome_do_contato: "Contact Name",
  telefone: "(12) 3456-7890",
  celular: "(12) 98765-4321",
  email: "example@example.com",
};

describe("Create Client Provider", () => {
  test("Test 1 -> successful", async () => {
    const data = dataExemple;

    (crudService.createInDatabase as jest.Mock).mockResolvedValue(data);

    const result = await clientsProvider.create(data);

    expect(result).toEqual(data);

    expect(crudService.createInDatabase).toHaveBeenCalledTimes(1);
  });

  test("Test 2 -> failed", async () => {
    const data = dataExemple;

    (crudService.createInDatabase as jest.Mock).mockResolvedValue(
      "Erro ao criar um novo cliente"
    );

    const result = await clientsProvider.create(data);

    expect(result).toEqual("Erro ao criar um novo cliente");
    expect(crudService.createInDatabase).toHaveBeenCalledTimes(1);
  });
});
