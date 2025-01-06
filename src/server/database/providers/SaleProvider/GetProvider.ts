import {
  errorsCrudService,
  errorsProvider,
} from '../../../shared/services/messageErrors';
import { relationsGet } from '../../../shared/services/relationsManager/RelationsGet';
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
    let sales: ISales | ISales[] | Error;

    if (query.id) {
      console.log(`Buscando venda com ID: ${query.id}`);
      const getSaleWithId = await prisma.sales.findUnique({
        where: { id: query.id },
        include: {
          customer: true,
          ProductSaleRelations: {
            include: { product: true },
          },
        },
      });

      if (!getSaleWithId) {
        console.log('Nenhuma venda encontrada com esse ID');
        return new Error(errorsCrudService.getMessage('Sales'));
      }
      sales = getSaleWithId;
    } else if (query.saleNumber) {
      console.log(`Buscando venda com número: ${query.saleNumber}`);
      const getSaleWithNumberOfSale = await prisma.sales.findMany({
        where: {
          saleNumber: { contains: query.saleNumber, mode: 'insensitive' },
        },
        include: {
          customer: true,
          ProductSaleRelations: {
            include: { product: true },
          },
        },
      });

      if (!getSaleWithNumberOfSale || getSaleWithNumberOfSale.length === 0) {
        console.log('Nenhuma venda encontrada com esse número');
        return new Error(errorsCrudService.getMessage('Sales'));
      }
      sales = getSaleWithNumberOfSale;
    } else if (query.customerName) {
      console.log(`Buscando venda com nome do cliente: ${query.customerName}`);
      const getSaleWithClientName = await prisma.sales.findMany({
        where: {
          customer: {
            name: {
              contains: query.customerName.trim(),
              mode: 'insensitive',
            },
          },
        },
        include: {
          customer: true,
          ProductSaleRelations: {
            include: { product: true },
          },
        },
      });

      if (!getSaleWithClientName || getSaleWithClientName.length === 0) {
        console.log('Nenhuma venda encontrada com esse nome de cliente');
        return new Error(errorsCrudService.getMessage('Sales'));
      }
      sales = getSaleWithClientName;
    } else {
      console.log('Buscando todas as vendas');
      sales = await prisma.sales.findMany({
        include: {
          customer: true,
          ProductSaleRelations: {
            include: { product: true },
          },
        },
      });
    }

    if (!sales || (Array.isArray(sales) && sales.length === 0)) {
      console.log('Nenhuma venda encontrada');
      return new Error(errorsCrudService.getMessage('Sales'));
    }

    if (Array.isArray(sales)) {
      for (let i = 0; i < sales.length; i++) {
        console.log(`Buscando produtos para a venda de ID: ${sales[i].id}`);

        const productSaleRelations = await relationsGet(
          'ProductSaleRelations',
          {
            where: { saleId: sales[i].id },
            include: { product: true },
          }
        );

        sales[i].productSaleRelations = productSaleRelations;

        console.log(
          `Resultado de productSaleRelations para venda ID: ${sales[i].id}`,
          sales[i].productSaleRelations
        );
      }
    } else {
      const singleSale = sales as ISales;
      console.log(`Buscando produtos para a venda de ID: ${singleSale.id}`);
      singleSale.productSaleRelations = await relationsGet(
        'ProductSaleRelations',
        {
          where: { saleId: singleSale.id },
          include: { product: true },
        }
      );

      console.log(
        `Resultado de productSaleRelations para venda ID: ${singleSale.id}`,
        singleSale.productSaleRelations
      );
    }

    console.log('Retorno final:', sales);
    return sales;
  } catch (error) {
    console.error('Erro:', error);
    return new Error(errorsProvider.getMessage('Sales'));
  }
};
