import { bcryptPassword } from "../../../shared/services/bcrypt";
import { userModel } from "../../models/UserModel";
import { prisma } from "../../prisma";
import { randomUUID } from "node:crypto";

type IUserWithoutId = Omit<userModel, "id">;
export const create = async (
  data: IUserWithoutId
): Promise<Error | userModel> => {
  try {
    const nameUserVerify = await prisma.usuario.findFirst({
      where: { nome: data.nome },
    });
    if (nameUserVerify) return new Error("Usuário já existente!");

    const newUser: userModel = {
      id: randomUUID(),
      ...data,
      permissionId: data.permissionId || null,
    };

    const passwordCrypto = await bcryptPassword.passwordHashed(newUser.senha);

    newUser.senha = passwordCrypto;

    const createNewUser = await prisma.usuario.create({
      data: newUser,
    });
    return createNewUser;
  } catch (err) {
    console.log(err);
    return new Error("Erro ao criar um novo usuário!");
  }
};
