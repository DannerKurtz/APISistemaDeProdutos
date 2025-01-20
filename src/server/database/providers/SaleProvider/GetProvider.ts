// Necessary imports
import { errorsProvider } from '../../../shared/services/messageErrors';
import { searchSales } from '../../../shared/services/searchSales';
import { ISales } from '../../models/SalesInterface';

// Definition of a query interface
interface IQuery {
  id: string;
  saleNumber: string;
  customerName: string;
}

// Exports the function responsible for retrieving the sales.
export const get = async (
  query: IQuery
): Promise<(ISales | ISales[]) | Error> => {
  try {
    // Calls the function responsible for dynamically searching for the sale
    const getSales: ISales | ISales[] | Error = await searchSales(query);

    // Returns the searched sales or an error
    return getSales;
  } catch (error) {
    // Returns error in case of an exception
    return new Error(errorsProvider.getMessage('Sales'));
  }
};
