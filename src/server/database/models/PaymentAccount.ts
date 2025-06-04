import { ICompany } from './CompanyInterface'; // Assuming you have this
import { ISales } from './SalesInterface'; // Assuming you have this

export interface IPaymentAccount {
  id: string;
  bankName: string;
  branch: string;
  accountNumber: string;
  accountHolder: string;
  taxId: string;
  pixKey: string;
  companyId: string;
  company?: ICompany; // Optional relation (mapped from Prisma's @relation)
  sales?: ISales[]; // Optional array of sales
  createdAt?: Date;
  updatedAt?: Date;
}

// Version without `id` (for creation)
export interface IPaymentAccountWithoutId extends Omit<IPaymentAccount, 'id'> {}
