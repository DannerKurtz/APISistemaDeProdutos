import { prisma } from "../../prisma";

export const get = async (id: string | any, nome: string | any) => {
  try {
    const whereClause: any = {};

    if (id) {
      whereClause.id = id;
    }

    if (nome) {
      whereClause.nome = {
        contains: nome,
        mode: "insensitive",
      };
    }

    const findUser = await prisma.usuario.findMany({
      where: whereClause,
      select: {
        id: true,
        nome: true,
      },
    });

    return findUser;
  } catch (err) {
    return new Error("Erro ao consultar os usuários!");
  }
};
