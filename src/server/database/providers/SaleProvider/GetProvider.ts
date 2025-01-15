import { errorsProvider } from '../../../shared/services/messageErrors';
import { searchSales } from '../../../shared/services/searchSales';
import { IProductSaleRelations } from '../../models/ProductSaleRelationsInterface';
import { ISales } from '../../models/SalesInterface';

type IQuery = {
  id: string;
  saleNumber: string;
  customerName: string;
};

export const get = async (
  query: IQuery
): Promise<(ISales | ISales[]) | Error> => {
  try {
    const getSales: ISales | ISales[] | Error = await searchSales(query);

    return getSales;
  } catch (error) {
    console.error('Erro:', error);
    return new Error(errorsProvider.getMessage('Sales'));
  }
};
