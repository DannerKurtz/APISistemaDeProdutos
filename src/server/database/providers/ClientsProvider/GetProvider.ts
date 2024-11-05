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

    const findClient = await prisma.clientes.findMany({
      where: whereClause,
    });

    return findClient;
  } catch (error) {
    return new Error("Erro ao consultar os clientes!");
  }
};
