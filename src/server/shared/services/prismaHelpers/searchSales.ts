// Required imports
import { ISales } from '../../../database/models/SalesInterface';
import { prisma } from '../../../database/prisma';

// Definition of an interface for the sales query
interface IQuerySales {
  id?: string;
  saleNumber?: string;
  customerName?: string;
}

// Export the function that performs the sales search
export const searchSales = async (
  query: IQuerySales
): Promise<ISales[] | ISales | Error> => {
  try {
    // If the customer name is provided, search based on the customer's name
    if (query.customerName) {
      const getSaleWithCustomerName: ISales[] = await prisma.sales.findMany({
        where: {
          customer: {
            name: { contains: query.customerName.trim(), mode: 'insensitive' },
          },
        },
        include: {
          customer: true,
          user: { select: { name: true } },
          ProductSaleRelations: {
            select: {
              product: true,
              color: true,
              quantity: true,
              productNote: true,
              customEngraving: true,
            },
          },
        },
      });
      return getSaleWithCustomerName;
    }

    // If the sale number is provided, search based on it
    if (query.saleNumber) {
      const getSaleWithNumberOfSale: ISales | null =
        await prisma.sales.findUnique({
          where: {
            saleNumber: query.saleNumber,
          },
          include: {
            customer: true,
            user: { select: { name: true } },
            ProductSaleRelations: {
              select: {
                product: true,
                color: true,
                quantity: true,
                productNote: true,
                customEngraving: true,
              },
            },
          },
        });
      if (getSaleWithNumberOfSale) {
        return getSaleWithNumberOfSale;
      }
      return new Error('Sale not found with number');
    }

    // If the id is provided, search based on the id
    if (query.id) {
      const getSaleWithNumberOfSale: ISales | null =
        await prisma.sales.findUnique({
          where: {
            id: query.id,
          },
          include: {
            customer: true,
            user: { select: { name: true } },
            ProductSaleRelations: {
              select: {
                product: true,
                color: true,
                quantity: true,
                productNote: true,
                customEngraving: true,
              },
            },
          },
        });
      if (getSaleWithNumberOfSale) {
        return getSaleWithNumberOfSale;
      }
      return new Error('Sale not found with id');
    }

    // If nothing is provided, return the list of all sales
    return await prisma.sales.findMany({
      include: {
        customer: true,
        user: { select: { name: true } },
        ProductSaleRelations: {
          select: {
            product: true,
            color: true,
            quantity: true,
            productNote: true,
            customEngraving: true,
          },
        },
      },
    });
  } catch (error) {
    // Return the error in case of an exception
    return new Error('Error while fetching sales data.');
  }
};
