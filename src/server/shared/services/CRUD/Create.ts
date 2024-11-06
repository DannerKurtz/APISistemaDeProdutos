import e from "express";
import { prisma } from "../../../database/prisma";
import { bcryptPassword } from "../bcrypt";

type TWithoutId<T> = Omit<T, "id">;

export const createInDatabase = async <
  T extends { nome: string; senha?: string }
>(
  data: TWithoutId<T>,
  modelName: string,
  message: string
): Promise<Error | T> => {
  try {
    const nameUserVerify = await (prisma as any)[modelName].findFirst({
      where: { nome: data.nome },
    });
    if (nameUserVerify) return new Error("Este nome está em uso!");

    if (data.senha) {
      const passwordCrypto = await bcryptPassword.passwordHashed(data.senha);
      data.senha = passwordCrypto;
    }

    const createNewData = await (prisma as any)[modelName].create({
      data,
    });

    return createNewData;
  } catch (error) {
    return new Error(message);
  }
};
