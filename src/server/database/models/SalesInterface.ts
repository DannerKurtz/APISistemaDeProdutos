import { ICustomers } from './CustomersInterface';
import { IProducts } from './ProductsInterface';
import { IUsers } from './UsersInterface';

export interface ISales {
  id: string;
  saleNumber?: string;
  discount: number;
  totalPrice: number;
  userId: string;
  user?: IUsers;
  customerId: string;
  customer?: ICustomers;
  products?: IProducts[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ISalesWithoutId extends Omit<ISales, 'id'> {}
