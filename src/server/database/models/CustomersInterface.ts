export interface ICustomers {
  id?: string;
  name: string;
  postalCode: string;
  city: string;
  taxId: string;
  stateRegistration: string;
  address: string;
  neighborhood: string;
  addressNumber: string;
  contactName: string;
  phone: string;
  mobile: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICustomersWithoutId extends Omit<ICustomers, 'id'> {}
