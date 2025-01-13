// Export the product and sales relation interface
export interface IProductSaleRelations {
  id: string;
  saleId: string;
  productId: string;
  quantity: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// Export the product and sales relation interface, but without the ID
export interface IProductSaleRelationsWithoutId
  extends Omit<IProductSaleRelations, 'id'> {}
