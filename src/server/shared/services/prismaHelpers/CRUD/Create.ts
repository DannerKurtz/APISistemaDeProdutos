import { prisma } from '../../../../database/prisma';
import { bcryptPassword } from '../../bcrypt';

type TWithoutId<T> = Omit<T, 'id'> &
  Partial<{ name?: string; password?: string }>;
export const createInDatabase = async <T>(
  data: TWithoutId<T>,
  modelName: string,
  message: string
): Promise<Error | T> => {
  try {
    if (data.name) {
      const nameUserVerify = await (prisma as any)[modelName].findFirst({
        where: { name: data.name },
      });
      if (nameUserVerify) return new Error('The name already exists');
    }

    if (data.password) {
      const passwordCrypto = await bcryptPassword.passwordHashed(data.password);
      data.password = passwordCrypto;
    }

    const createNewData = await (prisma as any)[modelName].create({
      data,
    });
    return createNewData;
  } catch (error) {
    console.log(error);
    return new Error(message);
  }
};
