export interface IProductSaleRelations {
  id: string;
  saleId: string;
  productId: string;
  quantity: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IProductSaleRelationsWithoutId
  extends Omit<IProductSaleRelations, 'id'> {}
