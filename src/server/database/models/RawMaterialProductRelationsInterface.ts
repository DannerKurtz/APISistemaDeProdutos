export interface IRawMaterialProductRelations {
  id: string;
  productId: string;
  rawMaterialId: string;
  rawMaterialQuantity: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IRawMaterialProductRelationsWithoutId
  extends Omit<IRawMaterialProductRelations, 'id'> {}
