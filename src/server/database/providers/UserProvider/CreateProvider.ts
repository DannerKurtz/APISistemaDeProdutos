import { bcryptPassword } from "../../../shared/services/bcrypt";
import { crudService } from "../../../shared/services/CRUD";
import { userModel } from "../../models/UserModel";
import { prisma } from "../../prisma";
import { randomUUID } from "node:crypto";

type IUserWithoutId = Omit<userModel, "id">;
export const create = async (
  data: IUserWithoutId
): Promise<Error | userModel> => {
  try {
    return crudService.createInDatabase(
      data,
      "usuario",
      "Erro ao criar um novo usuário"
    );
  } catch (err) {
    console.log(err);
    return new Error("Erro ao acessar o crudService para criar novo usuário!");
  }
};
