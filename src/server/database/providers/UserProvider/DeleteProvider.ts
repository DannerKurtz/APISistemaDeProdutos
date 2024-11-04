import { prisma } from "../../prisma";

export const deleteUser = async (id: string): Promise<Error | Boolean> => {
  try {
    const userDelete = await prisma.usuario.delete({
      where: {
        id,
      },
    });

    if (userDelete) return true;

    return new Error("Erro ao deletar o usuário");
  } catch (error) {
    return new Error("Erro ao deletar o usuário");
  }
};
