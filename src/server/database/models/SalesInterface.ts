import { ICustomers } from './CustomersInterface';
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
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ISalesWithoutId extends Omit<ISales, 'id'> {}
