import { crudService } from "../../../shared/services/CRUD";
import { userModel } from "../../models/UserModel";

interface IData {
  nome: string;
  senha: string;
  novaSenha?: string;
}
interface IBodyProps extends Omit<userModel, "senha"> {}
export const update = async (
  id: string,
  data: IData
): Promise<Error | IBodyProps> => {
  try {
    return crudService.updateInDatabase(
      id,
      data,
      "usuario",
      "Erro ao atualizar o usuário"
    );
  } catch (err) {
    return new Error("Erro ao acessar o crudService para atualizar o usuário!");
  }
};
