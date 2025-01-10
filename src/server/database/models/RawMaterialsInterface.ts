
export interface IRawMaterials {
  id: string;
  name: string;
  price: number;
  unitWeight: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IRawMaterialsWithoutId extends Omit<IRawMaterials, 'id'> {}
