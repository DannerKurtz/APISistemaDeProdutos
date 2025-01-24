// Importing the raw material and raw material-product relation interfaces
import { IRawMaterialProductRelations } from './RawMaterialProductRelationsInterface';
import { IRawMaterials } from './RawMaterialsInterface';

// Export the product interface
export interface IProducts {
  id: string;
  name: string;
  percentage?: number;
  price?: number;
  quantity: number;
  weight?: number;
  rawMaterialProductRelation?: IRawMaterialProductRelations[];
  rawMaterials?: IRawMaterials[];
  createdAt?: Date;
  updatedAt?: Date;
}

// Export the product interface, but without the ID
export interface IProductsWithoutId extends Omit<IProducts, 'id'> {}
