// Export the raw material and product relation interface
export interface IRawMaterialProductRelations {
  id: string;
  productId: string;
  rawMaterialId: string;
  rawMaterialQuantity: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// Export the raw material and product relation interface, but without the ID
export interface IRawMaterialProductRelationsWithoutId
  extends Omit<IRawMaterialProductRelations, 'id'> {}
