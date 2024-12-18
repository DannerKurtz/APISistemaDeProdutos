import { prisma } from '../../../database/prisma';
import { bcryptPassword } from '../bcrypt';

type withoutId<T> = Omit<T, 'id'> &
  Partial<{ name?: string; password?: string; newPassword?: string }>;

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
    if (data.password) {
      const passwordVerify = await bcryptPassword.passwordVerify(
        data.password,
        dataExist.password
      );
      if (!passwordVerify) {
        return new Error('Senha invalida!');
      }

      if (data.newPassword) {
        const passwordHash = await bcryptPassword.passwordHashed(
          data.newPassword
        );
        data.password = passwordHash;
      }
    }
    const { newPassword, ...dataWithoutNovaSenha } = data;
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
