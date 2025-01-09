import { IProductSaleRelations } from './ProductSaleRelationsInterface';
import { IRawMaterialProductRelations } from './RawMaterialProductRelationsInterface';
import { IRawMaterials } from './RawMaterialsInterface';

export interface IProducts {
  id: string;
  name: string;
  percentage: number;
  price?: number;
  quantity: number;
  rawMaterialProductRelation?: IRawMaterialProductRelations[];
  rawMaterials?: IRawMaterials[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IProductsWithoutId extends Omit<IProducts, 'id'> {}
