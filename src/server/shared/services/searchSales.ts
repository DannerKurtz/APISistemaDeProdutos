import { ISales } from '../../database/models/SalesInterface';
import { prisma } from '../../database/prisma';

interface IQuerySales {
  id: string;
  saleNumber: string;
  customerName: string;
}

export const searchSales = async (
  query: IQuerySales
): Promise<ISales[] | ISales | Error> => {
  try {
    if (query.customerName) {
      const getSaleWithCustomerName: ISales[] = await prisma.sales.findMany({
        where: {
          customer: {
            name: { contains: query.customerName.trim(), mode: 'insensitive' },
          },
        },
        include: { customer: true, user: { select: { name: true } } },
      });
      return getSaleWithCustomerName;
    }

    if (query.saleNumber) {
      const getSaleWithNumberOfSale: ISales | null =
        await prisma.sales.findUnique({
          where: {
            saleNumber: query.saleNumber,
          },
          include: {
            customer: true,
            user: { select: { name: true } },
            ProductSaleRelations: { include: { product: true } },
          },
        });
      if (getSaleWithNumberOfSale) {
        return getSaleWithNumberOfSale;
      }
      return new Error('Sale not found with number');
    }

    if (query.id) {
      const getSaleWithNumberOfSale: ISales | null =
        await prisma.sales.findUnique({
          where: {
            id: query.id,
          },
          include: {
            customer: true,
            user: { select: { name: true } },
            ProductSaleRelations: { select: { product: true } },
          },
        });
      if (getSaleWithNumberOfSale) {
        return getSaleWithNumberOfSale;
      }
      return new Error('Sale not found with id');
    }

    return await prisma.sales.findMany({
      include: {
        customer: true,
        user: { select: { name: true } },
        ProductSaleRelations: { select: { product: true } },
      },
    });
  } catch (error) {
    return new Error('Error while fetching sales data.');
  }
};
