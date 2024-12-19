import { IProductSaleRelations } from './ProductSaleRelationsInterface';
import { IRawMaterialProductRelations } from './RawMaterialProductRelationsInterface';
import { IRawMaterials } from './RawMaterialsInterface';

export interface IProducts {
  id: string;
  name: string;
  percentage: number;
  price: number;
  quantity: number;
<<<<<<< HEAD
  rawMaterialProductRelation?: IRawMaterialProductRelations[];
=======
>>>>>>> 892223ee73e35a25c4a369de75d2a5a572616d86
  rawMaterials?: IRawMaterials[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IProductsWithoutId extends Omit<IProducts, 'id'> {}
