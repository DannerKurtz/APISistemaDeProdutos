import { bcryptPassword } from "../../../shared/services/bcrypt";
import { userModel } from "../../models/UserModel";
import { prisma } from "../../prisma";

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
    const findUserId = await prisma.usuario.findUnique({
      where: {
        id,
      },
    });
    if (!findUserId) {
      return new Error("Usuário não encontrado!");
    }
    const senhaVerify = await bcryptPassword.passwordVerify(
      data.senha,
      findUserId.senha
    );
    if (senhaVerify) {
      if (data.novaSenha) {
        const newPasswordCrypt = bcryptPassword.passwordHashed(data.novaSenha);

        const updatedUserAndPassword = await prisma.usuario.update({
          where: { id },
          data: {
            nome: data.nome,
            senha: String(newPasswordCrypt),
          },
          select: {
            id: true,
            nome: true,
          },
        });
        return updatedUserAndPassword;
      }
      const updatedUser = await prisma.usuario.update({
        where: { id },
        data: {
          nome: data.nome,
        },
        select: {
          id: true,
          nome: true,
        },
      });
      return updatedUser;
    }
    return new Error("Erro ao atualizar usuário!");
  } catch (err) {
    return new Error("Erro ao atualizar usuário!");
  }
};
