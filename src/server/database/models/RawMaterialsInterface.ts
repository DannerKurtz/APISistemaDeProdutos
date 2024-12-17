import { IRawMaterialProductRelations } from './RawMaterialProductRelationsInterface';

export interface IRawMaterials {
  id: string;
  name: string;
  price: number;
  quantity: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IRawMaterialsWithoutId extends Omit<IRawMaterials, 'id'> {}
