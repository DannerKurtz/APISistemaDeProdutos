import { prisma } from '../../../database/prisma';
import { bcryptPassword } from '../bcrypt';

type TWithoutId<T> = Omit<T, 'id'> & Partial<{ nome?: string; senha?: string }>;

export const createInDatabase = async <T>(
  data: TWithoutId<T>,
  modelName: string,
  message: string
): Promise<Error | T> => {
  try {
    if (data.nome) {
      const nameUserVerify = await (prisma as any)[modelName].findFirst({
        where: { nome: data.nome },
      });
      if (nameUserVerify) return new Error('Este nome está em uso!');
    }

    if (data.senha) {
      const passwordCrypto = await bcryptPassword.passwordHashed(data.senha);
      data.senha = passwordCrypto;
    }

    const createNewData = await (prisma as any)[modelName].create({
      data,
    });
    console.log(createNewData);
    return createNewData;
  } catch (error) {
    console.log(error);
    return new Error(message);
  }
};
