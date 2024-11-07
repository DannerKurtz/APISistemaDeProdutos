import { clientsProvider } from "../../../src/server/database/providers/ClientsProvider";
import { crudService } from "../../../src/server/shared/services/CRUD";

jest.mock("../../../src/server/shared/services/CRUD", () => ({
  crudService: {
    getInDatabase: jest.fn(),
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

describe("Get Client Provider", () => {
  test("Test 1 -> successful", async () => {
    const id = "321asd1f23a3df21";
    let nome;
    (crudService.getInDatabase as jest.Mock).mockResolvedValue(dataExemple);

    const result = await clientsProvider.get(id, nome);

    expect(result).toEqual(dataExemple);
    expect(crudService.getInDatabase).toHaveBeenCalledTimes(1);
  });

  test("Test 2 -> failed", async () => {
    const id = "321asd1f23a3df21";
    let nome;
    (crudService.getInDatabase as jest.Mock).mockResolvedValue(
      "Erro ao consultar os clientes"
    );

    const result = await clientsProvider.get(id, nome);

    expect(result).toEqual("Erro ao consultar os clientes");
    expect(crudService.getInDatabase).toHaveBeenCalledTimes(1);
  });
});
