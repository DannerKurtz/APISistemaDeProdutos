import {
  errorsCrudService,
  errorsProvider,
} from '../../../shared/services/messageErrors';
import { ISales } from '../../models/SalesInterface';
import { prisma } from '../../prisma';

type IQuery = {
  id: string;
  saleNumber: string;
  customerName: string;
};

export const get = async (
  query: IQuery
): Promise<(ISales | ISales[]) | Error> => {
  try {
    if (query.id) {
      const getSaleWithId = await prisma.sales.findFirst({
        where: { id: query.id },
        include: { customer: true },
      });
      if (getSaleWithId instanceof Error || getSaleWithId === null)
        return new Error(errorsCrudService.getMessage('Sales'));
      return getSaleWithId;
    }
    if (query.saleNumber) {
      const getSaleWithNumberOfSale = await prisma.sales.findMany({
        where: {
          saleNumber: { contains: query.saleNumber, mode: 'insensitive' },
        },
        include: { customer: true },
      });
      if (
        getSaleWithNumberOfSale instanceof Error ||
        getSaleWithNumberOfSale === null
      )
        return new Error(errorsCrudService.getMessage('Sales'));
      return getSaleWithNumberOfSale;
    }

    if (query.customerName) {
      const getSaleWithClientName = await prisma.sales.findMany({
        where: {
          customer: {
            name: {
              contains: query.customerName.trim(),
              mode: 'insensitive',
            },
          },
        },
        include: { customer: true },
      });
      if (
        getSaleWithClientName instanceof Error ||
        getSaleWithClientName === null
      )
        return new Error(errorsCrudService.getMessage('Sales'));

      return getSaleWithClientName;
    }

    return await prisma.sales.findMany({
      include: { customer: true },
    });
  } catch (error) {
    return new Error(errorsProvider.getMessage('Sales'));
  }
};
