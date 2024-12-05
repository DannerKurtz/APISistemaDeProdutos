import { prisma } from '../../../database/prisma';
import { bcryptPassword } from '../bcrypt';

type withoutId<T> = Omit<T, 'id'> &
  Partial<{ nome?: string; senha?: string; novaSenha?: string }>;

export const updateInDatabase = async <T>(
  params: string,
  data: withoutId<T>,
  modelName: string,
  message: string
) => {
  try {
    const dataExist = await (prisma as any)[modelName].findFirst({
      where: { id: params },
    });
    if (!dataExist) {
      return new Error('ID nao encontrado!');
    }
    if (data.senha) {
      const passwordVerify = await bcryptPassword.passwordVerify(
        data.senha,
        dataExist.senha
      );
      if (!passwordVerify) {
        return new Error('Senha invalida!');
      }

      if (data.novaSenha) {
        const passwordHash = await bcryptPassword.passwordHashed(
          data.novaSenha
        );
        data.senha = passwordHash;
      }
    }
    const { novaSenha, ...dataWithoutNovaSenha } = data;
    return await (prisma as any)[modelName].update({
      where: { id: params },
      data: {
        ...dataWithoutNovaSenha,
      },
    });
  } catch (error) {
    return new Error(message);
  }
};
