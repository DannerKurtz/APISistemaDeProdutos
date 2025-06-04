// Importing interfaces
import { ICustomers } from './CustomersInterface';
import { IProductSaleRelations } from './ProductSaleRelationsInterface';
import { IProducts } from './ProductsInterface';
import { IUsers } from './UsersInterface';

type SaleStatus = 'QUOTE' | 'ORDER' | 'FINALIZED';
// Export the sales interface
export interface ISales {
  id: string;
  saleNumber?: string;
  status: SaleStatus;
  discount?: number;
  totalPrice?: number;
  userId: string;
  user?: IUsers;
  customerId: string;
  customer?: ICustomers;
  productSaleRelations?: IProductSaleRelations[];
  products?: IProducts[];
  paymentAccountId?: string; 
  createdAt?: Date;
  updatedAt?: Date;
}

// Export the sales interface, but without the ID
export interface ISalesWithoutId extends Omit<ISales, 'id'> {}
