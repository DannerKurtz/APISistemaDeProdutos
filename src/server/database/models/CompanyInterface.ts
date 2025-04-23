export interface ICompany {
  id: string;
  name: string;
  taxId: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface ICompanyWithoutId extends Omit<ICompany, 'id'> {}

