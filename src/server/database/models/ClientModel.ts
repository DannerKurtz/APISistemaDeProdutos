export interface CustomersModel {
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
  createdAt?: string;
  updatedAt?: string;
}

export interface CustomersModelWithoutId extends Omit<CustomersModel, 'id'> {}
