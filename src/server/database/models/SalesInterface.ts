// Importing interfaces
import { ICustomers } from './CustomersInterface';
import { IProductSaleRelations } from './ProductSaleRelationsInterface';
import { IProducts } from './ProductsInterface';
import { IUsers } from './UsersInterface';

// Export the sales interface
export interface ISales {
  id: string;
  saleNumber?: string;
  discount: number;
  totalPrice: number;
  userId: string;
  user?: IUsers;
  customerId: string;
  customer?: ICustomers;
  productSaleRelations?: IProductSaleRelations[];
  products?: IProducts[];
  createdAt?: Date;
  updatedAt?: Date;
}

// Export the sales interface, but without the ID
export interface ISalesWithoutId extends Omit<ISales, 'id'> {}
