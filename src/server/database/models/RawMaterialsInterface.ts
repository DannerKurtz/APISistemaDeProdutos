// Export the raw material interface
export interface IRawMaterials {
  id: string;
  name: string;
  price: number;
  unitWeight: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// Export the raw material interface, but without the ID
export interface IRawMaterialsWithoutId extends Omit<IRawMaterials, 'id'> {}
