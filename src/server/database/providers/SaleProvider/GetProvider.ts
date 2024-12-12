import { SaleModel } from '../../models/SaleModel';
import { prisma } from '../../prisma';

type IQuery = {
  id: string;
  numeroDaVenda: string;
  nomeDoCliente: string;
};

export const get = async (
  query: IQuery
): Promise<(SaleModel[] | SaleModel) | Error> => {
  try {
    if (query.id) {
      const getSaleWithId = await prisma.vendas.findFirst({
        where: { id: query.id },
        include: { clientes: true },
      });
      if (getSaleWithId instanceof Error || getSaleWithId === null)
        return new Error('Erro ao consultar venda');
      return getSaleWithId;
    }
    if (query.numeroDaVenda) {
      const getSaleWithNumberOfSale = await prisma.vendas.findMany({
        where: {
          numeroDaVenda: { contains: query.numeroDaVenda, mode: 'insensitive' },
        },
        include: { clientes: true },
      });
      if (
        getSaleWithNumberOfSale instanceof Error ||
        getSaleWithNumberOfSale === null
      )
        return new Error('Erro ao consultar venda');
      return getSaleWithNumberOfSale;
    }

    if (query.nomeDoCliente) {
      const getSaleWithClientName = await prisma.vendas.findMany({
        where: {
          clientes: {
            nome: {
              contains: query.nomeDoCliente.trim(),
              mode: 'insensitive',
            },
          },
        },
        include: { clientes: true },
      });
      if (
        getSaleWithClientName instanceof Error ||
        getSaleWithClientName === null
      )
        return new Error('Erro ao consultar venda');

      return getSaleWithClientName;
    }

    return await prisma.vendas.findMany({
      include: { clientes: true },
    });
  } catch (error) {
    return new Error('Erro ao consultar a base de dados de vendas');
  }
};
